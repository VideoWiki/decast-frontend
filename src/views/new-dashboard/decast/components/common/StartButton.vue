<template>
  <svg :width="width" :height="height" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.742188 0H31.7422V31H0.742188V0Z" fill="#D7DF23" />
    <path
      d="M31.7422 31V31.8596H32.6018V31H31.7422ZM30.8826 0V31H32.6018V0H30.8826ZM31.7422 30.1404H0.742188V31.8596H31.7422V30.1404Z"
      fill="white" />
    <path d="M8.62458 7.88238H7.10107V23.1174H8.62458V7.88238Z" fill="black" />
    <path d="M8.62462 6.35889L8.62458 7.88238L11.6716 7.88239V6.35889H8.62462Z" fill="black" />
    <path d="M11.6716 7.88239L11.6716 9.4059L14.7186 9.40589L14.7186 7.8824L11.6716 7.88239Z" fill="black" />
    <path d="M14.7186 9.40589V10.9294L17.7656 10.9294L17.7656 9.40589H14.7186Z" fill="black" />
    <path d="M17.7656 10.9294V12.4529L20.8126 12.4529L20.8126 10.9294H17.7656Z" fill="black" />
    <path d="M20.8126 12.4529V13.9764L23.8596 13.9764L23.8597 12.4529H20.8126Z" fill="black" />
    <path d="M23.8596 17.0234H25.3831V13.9764H23.8596V17.0234Z" fill="black" />
    <path d="M20.8126 17.0234V18.5469H23.8597L23.8596 17.0234L20.8126 17.0234Z" fill="black" />
    <path d="M17.7656 18.5469V20.0704H20.8126L20.8126 18.5469L17.7656 18.5469Z" fill="black" />
    <path d="M14.7186 20.0704V21.5939H17.7656L17.7656 20.0704L14.7186 20.0704Z" fill="black" />
    <path d="M11.6716 21.5939L11.6716 23.1174L14.7186 23.1174L14.7186 21.5939L11.6716 21.5939Z" fill="black" />
    <path d="M8.62458 23.1174L8.62462 24.6409H11.6716V23.1174L8.62458 23.1174Z" fill="black" />
    <path
      d="M11.6715 7.88232H8.62451V23.1174H11.6715V21.5939H14.7185V20.0704H17.7655V18.5469H20.8125V17.0233H23.8596V13.9763H20.8125V12.4528H17.7655V10.9293H14.7185V9.40583H11.6715V7.88232Z"
      fill="white" />
  </svg>

</template>

<script>
export default {
  name: 'StartButton',
  props: {
    color: {
      type: String,
      default: '#D7DF23',
    },
    width: {
      type: String,
      default: '36',
    },
    height: {
      type: String,
      default: '36',
    },
  },
};
</script>
