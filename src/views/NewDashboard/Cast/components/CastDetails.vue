<template>
    <div>
        <div class="cast_header flex justify-between items-center w-full h-16 px-4 py-2">
            <p class="text-xl font-bold">/cast.details</p>
            <p class="text-red font-bold">
                <span class="font-bold text-4xl">.</span> LIVE
            </p>
        </div>

        <div>
            <p>>> Cast Type > {{ selectedCastId.attendee }}</p>
            <p>>> Total Attendees > {{ selectedCastId.attendee }}</p>
            <p>>> Scheduled Date > {{ selectedCastId.attendee }}</p>
            <p>>> Scheduled Time > {{ selectedCastId.attendee }}</p>
            <p>>> NFT Drop > {{ selectedCastId.attendee }}</p>
            <p>>> Live Casting > {{ selectedCastId.attendee }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CastDetails",
    props: ['selectedCastId'],
    methods: {
        getCastDetail(){
            
        }
    },
}
</script>

<style scoped>
.cast_header {
    background-color: #272727;
}
</style>