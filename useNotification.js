import notifee, { AndroidStyle, AndroidVisibility, AndroidImportance, AndroidColor, EventType } from '@notifee/react-native';


export const useNotification = () => {

  async function displayNotification(title, body) {


    const channelId = await notifee.createChannel({ id: 'default', name: 'Default Channel', });

    await notifee.requestPermission();

    notifee.registerForegroundService((notification) => {
      return new Promise(() => {
        notifee.onForegroundEvent(({ type, detail }) => {
          if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'stop') {
            notifee.stopForegroundService().then(() => { })
          }
        });
      });
    });


    const notificationId = notifee.displayNotification({
      id: 'del',
      title: title,
      body: body,
      android: {channelId}
    });





    // notifee.registerForegroundService(() => {
    //   return new Promise(() => {
    //     // Example task subscriber
    //     // onTaskUpdate(async task => {
    //     //   if (task.complete) {
    //     //       await notifee.stopForegroundService()
    //     //   }
    //     // });
    //   });
    // });



    // const notificationId = notifee.displayNotification({
    //   title: '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
    //   subtitle: '&#128576;',
    //   body:
    //     'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
    //   android: {
    //     channelId,
    //     // asForegroundService: true,
    //     // colorized: true,
    //     color: '#4caf50',
    //     actions: [
    //       {
    //         title: '<b>Dance</b> &#128111;',
    //         pressAction: { id: 'dance' },
    //       },
    //       {
    //         title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
    //         pressAction: { id: 'cry' },
    //       },
    //     ],
    //   },
    //   ios: {
    //     // categoryId: "new-episode",
    //     categoryId: "reminder",
    //     attachments: [{url: require("../../assets/trailer-greys.mp4")}]
    //   }
    // });


    // notifee.displayNotification({
    //   title: title,
    //   body: body,
    //   subtitle: "Grey's Anatomy",
    //   android: {
    //     channelId,
    //     // importance: AndroidImportance.HIGH,
    //     // visibility: AndroidVisibility.PRIVATE,
    //     // vibration: true,
    //     sound:'default',
    //     color: AndroidColor.BLUE,
    // asForegroundService: true,
    // colorized: true
    //     // largeIcon: "https://b.thumbs.redditmedia.com/ss0L-8MRW23gOdqu_hEAqs7MgGLZgE3j4N-ur4eRK7A.png",
    //     // style: { type: AndroidStyle.BIGPICTURE, picture: require("../../assets/new-episode-ga-image.png"),},
    //   },
    //   ios: {
    //     // categoryId: "new-episode",
    //     categoryId: "reminder",
    //     attachments: [{url: require("../../assets/trailer-greys.mp4")}]
    //   }
    // });
    return notificationId;
  }


  async function cancelAllNotifications() {
    await notifee.cancelAllNotifications();
  }

  async function cancelNotification(notificationId) {
    await notifee.cancelNotification(notificationId);
  }

  return {
    displayNotification,
    cancelAllNotifications,
    cancelNotification
  }
}