import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const normalizeUserNames = functions.https.onRequest((request, response) => {
    // admin.database().ref('/users').once('value', (snapshot) => {
    //     // Loop through items
    //     snapshot.forEach((element) => {
    //         const user = element.val();
            
    //         if (user.displayName) {
    //             const fullNameArray = user.displayName.trim().split(' ');
    //             switch (fullNameArray.length) {
    //                 case 1:
    //                     element.ref.update({ firstName: fullNameArray[0] });
    //                 break;
    //                 case 2:
    //                     element.ref.update({ firstName: fullNameArray[0], lastName: fullNameArray[1] });
    //                     break;
    //                 case 3:
    //                     element.ref.update({ 
    //                         firstName: fullNameArray[0],
    //                         lastName: fullNameArray[1] + ' ' + fullNameArray[2]
    //                     });
    //                     break;
    //                 case 4:
    //                     element.ref.update({ 
    //                         firstName: fullNameArray[0] + ' ' + fullNameArray[1],
    //                         lastName: fullNameArray[2] + ' ' + fullNameArray[3]
    //                     });
    //                     break;
                
    //                 default:
    //                     if (fullNameArray.length > 4) {
    //                         element.ref.update({ 
    //                             firstName: fullNameArray[0] + ' ' + fullNameArray[1],
    //                             lastName: fullNameArray.slice(2, fullNameArray.length - 1).join(' ')
    //                         });
    //                     } else {
    //                         element.ref.update({ firstName: fullNameArray[0].trim() });
    //                     }
    //                     break;
    //             }
    //         } else {
    //             console.log('No name uid: ', element.key);
    //         }
    //     });
    //     console.info('---- Loop finished!');
    //     response.send('Names updated successfully!');
    // });
});

export const addUidToUsers = functions.https.onRequest((req, res) => {
    // admin.database().ref('/users').once('value', (snapshot) => {
    //     snapshot.forEach((element) => {
    //         element.ref.update({ uid: element.key });
    //     });
    //     res.send('Uid added!');
    // })
});