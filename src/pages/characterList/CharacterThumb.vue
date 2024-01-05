<template>
    <div
        class="illustration-container"
        :style="{
            flexDirection: large ? 'row' : 'column',
            width: large ? 'auto' : '200px'
        }"
    >
        <div
            class="illustration"
            :style="{
                'background-image': 'url(' + char.xsmall.avatar + ')'
            }"
        >
            <div
                v-if="char.xsmall.avatar === ''"
                style="
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                "
            >
                <p
                    style="
                        font-size: 16px;
                        font-weight: bold;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 100%;
                        text-align: center;
                    "
                >
                    {{ char.name }}
                </p>
            </div>
            <div class="illustration-mask" @click="openChar()"></div>
            <div class="illustration-more">
                <button @click="openMenu" class="mat-icon-button">
                    {{ char.star ? 'favorite' : 'favorite_border' }}
                </button>
                <ul v-if="menuOpen" class="mat-menu">
                    <li v-if="char.recycle" style="color: green" @click="restoreChar()">还原</li>
                    <li @click="uploadAssets()">上传资源</li>
                    <li @click="updateCategory()">修改类别</li>
                    <li @click="uploadAvatar()">修改头像</li>
                    <li @click="uploadFullbody()">修改立绘</li>
                    <li @click="updateStaticCategory()">修改静态类别</li>
                    <li @click="updateCharship()">修改人物关系</li>
                    <li @click="updateInfo()">修改基础信息</li>
                    <li v-if="removable" style="color: red" @click="removeChar()">删除</li>
                </ul>
            </div>
            <div class="illustration-star">
                <button :class="{ color: char.star }" @click="star()">
                    <span>{{ char.star ? 'favorite' : 'favorite_border' }}</span>
                </button>
            </div>
        </div>
        <div v-if="!large" class="illustration-normal">
            <div class="illustration-name">
                <span @click="openChar()" :title="char.name">{{ char.name }}</span>
            </div>
        </div>
        <div v-if="large" class="illustration-large">
            <div class="illustration-large__top">
                <div
                    style="
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        flex-shrink: 0;
                        max-width: 360px;
                    "
                >
                    <span
                        style="
                            margin-right: 10px;
                            font-size: 12px;
                            line-height: 12px;
                            text-wrap: nowrap;
                        "
                        >姓名</span
                    >
                    <div class="illustration-name" style="margin: 0; padding: 0; font-size: 18px">
                        <span @click="openChar()" :title="char.name">{{ char.name }}</span>
                    </div>
                </div>
                <div class="illustration-info">
                    <div v-for="column in infos" class="illustration-info__column">
                        <div v-for="item in column" class="text-overflow">
                            <div class="square"></div>
                            <span>{{ item[0] }}：{{ item[1] }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="char.intro" class="illustration-large__bottom">
                <div class="illustration-intro">
                    {{ char.intro }}
                </div>
            </div>
        </div>
        <div style="display: flex; flex-direction: column">
            <div style="display: flex; flex-direction: row; flex-wrap: wrap">
                <div v-for="tag in sources" class="illustration-groups" @click="openTag(tag)">
                    {{ tag.name }}
                </div>
            </div>
            <app-character-picker
                v-if="char.relations && char.relations.length > 0"
                :chars="char.relations"
                :updateMode="false"
                :border="false"
                :inline="true"
            ></app-character-picker>
            <div style="font-size: 12px; text-align: right; color: #999">
                Created: {{ formatDate(char.created) }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCharshipPreviews } from './characters'

const props = defineProps({
    char: {
        type: Object,
        required: true
    },
    large: {
        type: Boolean,
        default: false
    },
    target: {
        type: Boolean,
        default: false
    },
    preview: {
        type: Boolean,
        default: false
    },
    removable: {
        type: Boolean,
        default: true
    }
})

defineEmits(['refresh', 'afterRemoved'])

const sources = ref([])
const { relations } = useCharshipPreviews(props.char.id)

function _refreshGroupTags() {
    if (sources.value.length > 0) sources.value = []
    if (props.char.tags)
        props.char.tags.forEach((tag: any) => {
            if (tag.category.id === 1 || tag.category.id === 29 || tag.category.id === 48)
                sources.value.push(tag)
            sources.value = sources.value
                .sort((a, b) => a.order - b.order)
                .sort((a, b) => a.category.id - b.category.id)
        })
}
</script>
<style lang="sass">
.illustration-container
  margin: 10px
  display: flex
  flex-wrap: wrap
  max-width: 800px
  justify-content: flex-start
  position: relative

.illustration
  height: 200px
  width: 200px
  background-position: center center
  background-repeat: no-repeat
  background-size: cover
  cursor: pointer
  border-radius: 10px
  overflow: hidden
  position: relative

  .square
    width: 5px
    height: 5px
    border-radius: 50%
    margin-right: 5px
    background: rgb(73, 73, 73)

.illustration-normal
  width: 100%

.illustration-large
  display: flex
  flex-direction: column
  padding: 5px 0 5px 10px

  &__top
    max-width: 590px
    min-height: 110px
    display: flex
    flex-direction: row
    flex-wrap: wrap
    box-sizing: border-box

  &__bottom
    max-width: 590px
    min-width: 200px
    height: 80px
    box-sizing: border-box

.illustration-groups
  cursor: pointer
  margin: 6px 6px 0 0
  background-color: #e0e0e0
  color: #000000de
  padding: 4px 5px
  border-radius: 5px
  font-size: 12px
  max-width: 100px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  transition: background-color .2s ease-in-out

  &:hover
    background-color: #b8b8b8

.illustration-info
  display: flex
  flex-direction: row
  flex-basis: 100%
  width: 100%
  box-sizing: border-box
  justify-content: space-between
  flex-wrap: wrap

  &__column
    width: 195px
    overflow: hidden

.illustration-intro
  width: 100%
  height: 100%
  text-indent: 2em
  overflow: hidden
  text-overflow: ellipsis
  display: -webkit-box
  -webkit-line-clamp: 4
  -webkit-box-orient: vertical

.text-overflow
  display: flex
  flex-direction: row
  align-items: center

  &>span
    width: 100%
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.illustration-name
  font-size: 16px
  padding: 5px 0 0
  overflow: hidden
  text-decoration: none
  text-overflow: ellipsis
  white-space: nowrap
  font-weight: 500

  > span
    cursor: pointer

    &:hover
      color: #999
      text-decoration: underline

.illustration-mask
  width: 100%
  height: 100%
  background-color: #fff
  opacity: 0
  transition: opacity 0.3s

  &:hover
    opacity: 0.2

@media screen and (max-width: 1000px)
  .illustration-mask:hover
    opacity: 0

.illustration-star
  position: absolute
  right: 2px
  bottom: 2px

.illustration-more
  position: absolute
  right: 2px
  top: 2px
</style>
