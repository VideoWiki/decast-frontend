const constants = {
  apiUrl: 'https://dev.editor.video.wiki',
  url: 'https://videowiki.pt',
  backImageUrl: 'https://api.cast.video.wiki/api/photos/?category=',
  apiCastUrl: 'https://api.cast.decast.live/',
  streamUrl: 'https://play.stream.video.wiki/live/',
  eventDetailsUrl:
    'https://api.cast.video.wiki/api/event/meeting/info/?public_meeting_id=',
  oneClickPass: '5ZfEb9iu.6YVrCXRUp7x62bqTyK0cjHrgOOasBsWT',
  contractAddress: '0x15a0b4bba8e561f13c3c1d2acd5954b7e871cfb0',
  apiKey: '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',
  web3ApiKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYxZUMxQTlhMDc5NDNlQjBjMTcwQWZhMjcxNTY4MTg4NDA5YzAyRWIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzA5NDQ2OTA5MjUsIm5hbWUiOiJiZWx1Z2EifQ.A2JdUCF0vKXJXGlaTKJ1pBNIDLT2MWa4m8OGHpCWfIA',
  redirect_uri: 'https://dev.stream.video.wiki/callback/',
  client_id: 'new-decast-prod-1.0',
  client_secret: 'x1N6QQsfhhYnKDuMTZDlf-oFcJ',
  hydra_ep: 'https://openid.video.wiki',
  hydra_lg: 'https://login.video.wiki',
  challengeUri:
    'https://login.video.wiki/oauth2/auth?audience=&max_age=0&prompt=&redirect_uri=https://decast.live/callback/&response_type=code&scope=openid+offline+offline_access&client_id=new-decast-prod-1.0&nonce=hognfveoohhddoralbeygsjg&state=imnweycejbfpyrmnahgqzcmm',
  profilingUrl: 'https://openid.video.wiki',
};

if (process.env.NODE_ENV === 'production') {
  constants.apiUrl = 'https://dev.editor.video.wiki';
  constants.url = 'https://videowiki.pt';
  constants.backImageUrl = 'https://api.cast.video.wiki/api/photos/?category=';
  constants.streamUrl = 'https://play.stream.video.wiki/live/';
  constants.eventDetailsUrl =
    'https://api.cast.video.wiki/api/event/meeting/info/?public_meeting_id=';
}
// if (process.env.NODE_ENV === 'production') {
//   constants.apiUrl = 'https://api.video.wiki',
//   constants.url = 'https://videowiki.pt',
//   constants.backImageUrl = "https://api.cast.video.wiki/api/photos/?category=",
//   constants.apiCastUrl = 'https://api.cast.video.wiki',
//   constants.streamUrl = "https://play.stream.video.wiki/live/";
//   constants.eventDetailsUrl = "https://api.cast.video.wiki/api/event/meeting/info/?public_meeting_id="
// }

export default constants;
