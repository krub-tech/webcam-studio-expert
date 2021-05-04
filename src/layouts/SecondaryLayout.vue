<template>
    <div class="secondary-layout bg_gradient">
        <div class="secondary-layout--inner">
            <router-view class="secondary-layout--content" />
            <button class="close-btn" @click="$router.go(-1)" />
        </div>
    </div>
</template>

<script>
export default {
  name: 'SecondaryLayout',
};
</script>

<style lang="scss">
.secondary-layout {
    position: relative;
    &.bg_gradient {
        padding: 80px 0;
        &::before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: -1;
            background: linear-gradient(90deg, #c45792 0%, #7f53c4 100%);
            opacity: 0.6;
        }
    }
    .close-btn {
        right: -25px;
    }
}
.secondary-layout--content {
    width: 350px;
    background-color: #fbfbfd;
    border-radius: 10px;
    padding: 24px 28px;
    overflow: hidden;
}
.secondary-layout--inner {
    position: relative;
    width: max-content;
    height: max-content;
    margin: 0 auto;
}
</style>
