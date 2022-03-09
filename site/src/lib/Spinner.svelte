<script>
  export let unit = "px";
  export let duration = "1.5s";
  export let size = "40";
</script>

<style>
  .wrapper {
    width: var(--size);
    height: calc(var(--size) / 2);
    overflow: hidden;
  }
  .rainbow {
    width: var(--size);
    height: var(--size);
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-top-color: transparent;
    box-sizing: border-box;
    transform: rotate(115deg);
    border-radius: 50%;
    border-style: solid;
    animation: var(--duration) cubic-bezier( 0.8, 0.1, 0.43, 0.88 ) 0s infinite normal none running
      rotate;
  }
  @keyframes rotate {
    0% {
      border-width: 5px;
    }
    100% {
      transform: rotate(-220deg);
      border-width: 5px;
    }
  }
</style>

<div
  class="wrapper inline-block absolute -mt-0.5 ml-2"
  style="--size: {size}{unit}; --duration: {duration};">
  <div class="rainbow border-r-[#88C5CC] dark:border-r-[#FFD05B]" />
</div>
