import sa from 'sa-sdk-javascript'

const sensorsdata = {
  eventDraw: function (obj) {
    console.log(obj, 'eventDraw')
    sa.track('eventDraw', obj)
  },
  clickMissionAccomplished: function (obj) {
    console.log(obj, 'clickMissionAccomplished')
    sa.track('clickMissionAccomplished', obj)
  },
  activityLogin: function (obj) {
    console.log(obj, 'activityLogin')
    sa.track('activityLogin', obj)
  },

}
export default sensorsdata
