<script setup lang="ts">
// card flip: https://codepen.io/desandro/pen/LmWoWe
const props = defineProps(['user']);
const numFilled = ref(props.user.points % 20);
const isFlipped = ref();

function getRandomRotation() {
  return (Math.random() * 360).toString();
}
</script>

<template>
    <div class="scene">
      <div @click="isFlipped = !isFlipped" :class="`card ${ isFlipped ? 'is-flipped' : '' }`">
        <div class="card-face front">
          <div class="heading">
            OFFICIAL MEMBER
          </div>
          <div class="content">
            <div class="item">
              Irish Carbomb Club
            </div>
            <img src="/img/logo256.png" class="item"/>
          </div>
        </div>
        <div class="card-face back">
          <div class="heading">
            Name:<div class="line"><span class="name">{{ user.name }}</span></div>
            <div v-if="user.points > 20" class="number">#{{ Math.floor(user.points / 20) }}</div>
          </div>
          <div class="content">
            <div v-for="item in 20" class="item" :key="item">
              <div v-if="item <= numFilled"
                class="stamp"
                :style="{
                  transform: 'rotate(' + getRandomRotation() + 'deg)'
                }"
              >&#9752;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.scene {
  margin-inline: auto;
  perspective: 1000px;
  aspect-ratio: 3.4/2.1;
}

.card {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  background-color: rgb(255, 255, 255);
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  box-shadow: var(--box-shadow);
}

.front {
  color: #1B4C2C;
  
  display: flex;
  flex-direction: column;
  container-type: inline-size;

  .heading {
    text-align: center;
    font-weight: bold;
    font-size: 10cqw;
    padding-top: 1cqw;
  }

  .content {
    margin-inline: 3cqw;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;

    .item {
      text-align: center;
      font-size: 11cqw;
      font-family: 'Times New Roman', Times, serif;
      font-weight: 600;
      height: 100%; 
      width: 100%;
      margin-bottom: -3cqw;
    }
  }
}

.back {
  transform: rotateY(180deg);
  color: #1B4C2C;

  display: flex;
  flex-direction: column;
  container-type: inline-size;

  .heading {
    margin-top: 2cqw;
    margin-inline: 5cqw;
    display: flex;
    font-weight: bold;
    font-size: 5cqw;
    padding-top: 1cqw;

    .line {
      width: 100%;
      border-bottom: 0.5cqw solid #1B4C2C;

      .name {
        padding-left: 4cqw;
      }
    }

    .number {
      margin-left: -4cqw;
    }
  }

  .content {
    height: 100%;
    margin-block: 4cqw;
    margin-inline: 6cqw;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 4cqw 9cqw;

    .item {
      position: relative;
      box-sizing: border-box;
      border: 0.8cqw solid #1B4C2C;
      border-right: 1.8cqw solid #1B4C2C;
      border-bottom: 1.8cqw solid #1B4C2C;

      .stamp {
        color: #108539;
        position: absolute;
        font-size: 14cqw;
        top: -7cqw;
        left: -2cqw;
      }
    }
  }
}

</style>