import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const addUidToUsers = functions.https.onRequest((req, res) => {
    // admin.database().ref('/users').once('value', (snapshot) => {
    //     snapshot.forEach((element) => {
    //         element.ref.update({ uid: element.key });
    //     });
    //     res.send('Uid added!');
    // })
    res.send('addUidToUsers called!');
});

const updatePaymentDetails = (paymentsRef: admin.database.Reference) => {
    return paymentsRef.once('value', 
        (pSnapshot) => {
            let total_sum = 0;
            let unverified_payments = 0;
            let new_status = '';
            pSnapshot.forEach((element) => {
                const payment = element.val();
                if ( element.key !== 'details' && !payment.disposed) {
                    if (payment.verified) total_sum += (payment.cant as number);
                    else unverified_payments ++;
                }
            });
            const details = pSnapshot.val()['details'];
            // Get status
            if (unverified_payments == 0) {
                if(total_sum >= details.totalCost) new_status = 'NO_DEBT';
                else new_status = 'HAS_DEBT';
            } else new_status = 'PENDING_VERIFICATION';
            console.log('La suma de los pagos verificados es: ', total_sum);
            console.log('El status es: ', new_status);
            // Update details
            return pSnapshot.ref.child('details').update({ paid: total_sum, status: new_status });
        },
        (err:Object) => console.log('Al parecer ocurrio un error: ', err)
    );
}

export const onPaymentUpdated = functions.database.ref('/events/{event}/attendance/{uid}/payments/{payment}')
    .onUpdate((change, context) => {
        if (context.params.payment !== 'details') {
            console.log('Se ha actualizado el pago con id: ', context.params.payment);
            // Verify that either "cant", "verified" or "disposed" has changed
            const prevPayment = change.before.val();
            const afterPayment = change.after.val();
            if((prevPayment.cant !== afterPayment.cant) || 
                (prevPayment.verified !== afterPayment.verified) || 
                (prevPayment.disposed !== afterPayment.disposed)) {
                // If so, sum paid of all payments with verified = true                
                return updatePaymentDetails(change.after.ref.parent);
            }
        }
        return null;
    }
);

export const onPaymentCreated = functions.database.ref('/events/{event}/attendance/{uid}/payments/{payment}')
    .onCreate((snapshot, context) => {
        if (context.params.payment !== 'details') {
            console.log('Se ha creado el pago con id: ', context.params.payment);
            return updatePaymentDetails(snapshot.ref.parent);
        }
        return null;
    });

