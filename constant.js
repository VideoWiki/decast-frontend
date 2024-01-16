const constants = {
  apiUrl: 'https://dev.editor.video.wiki',
  url: 'https://videowiki.pt',
  backImageUrl: 'https://api.cast.video.wiki/api/photos/?category=',
  apiCastUrl: 'https://api.cast.decast.live',
  apiRoomUrl:'https://api.room.video.wiki',
  streamUrl: 'https://play.stream.video.wiki/live/',
  eventDetailsUrl:
    'https://api.cast.video.wiki/api/event/meeting/info/?public_meeting_id=',
  oneClickPass: '5ZfEb9iu.6YVrCXRUp7x62bqTyK0cjHrgOOasBsWT',
  contractAddress: '0x15a0b4bba8e561f13c3c1d2acd5954b7e871cfb0',
  apiKey: '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',
  web3ApiKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYxZUMxQTlhMDc5NDNlQjBjMTcwQWZhMjcxNTY4MTg4NDA5YzAyRWIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzA5NDQ2OTA5MjUsIm5hbWUiOiJiZWx1Z2EifQ.A2JdUCF0vKXJXGlaTKJ1pBNIDLT2MWa4m8OGHpCWfIA',
  redirect_uri: 'https://decast.live/callback/',
  client_id: 'decast-prod',
  client_secret: 'C2pwmmLh-P5vUHtppXfOku96eQ',
  hydra_ep: 'https://openid.video.wiki',
  hydra_lg: 'https://login.decast.live',
  challengeUri:
    'https://login.decast.live/oauth2/auth?audience=&max_age=0&prompt=&redirect_uri=https://decast.live/callback/&response_type=code&scope=openid+offline&client_id=decast-prod&nonce=hognfveoohhddoralbeygsjg&state=imnweycejbfpyrmnahgqzcmm',
  profilingUrl: 'https://openid.video.wiki',
  pinataKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MjY5M2EwZS1jYWY2LTRjNzUtYWZkNC1iNTQ1ZGQ4MDNmNWEiLCJlbWFpbCI6Inp0ZWNoOTE4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxNThkMTdiYTRmYTUzODQ0NWFmYSIsInNjb3BlZEtleVNlY3JldCI6ImQ0MTJjOGVhOGJiZGNiZjljYjkwN2U5OWVmNGJkMTVkNGM0OTgyZTQ2YTIyNmE0NmU2MTViNzJmYzg1ZDZjYjQiLCJpYXQiOjE3MDQyNzU5OTV9.Bit4dIaEVZHYTcNOpSBC6tRjK88WbmusoUwIXTmoJKQ',
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
