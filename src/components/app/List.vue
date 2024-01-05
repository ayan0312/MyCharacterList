<template>
    <v-list
        v-model:opened="opened"
        :nav="nav"
        :items="computedItems"
        :lines="false"
        color="primary"
        density="compact"
        item-props
        slim
    >
        <template v-if="$slots.item" #item="itemProps">
            <slot name="item" v-bind="itemProps" />
        </template>

        <template #divider>
            <slot name="divider" />

            <v-divider v-if="!$slots.divider" class="my-3 mb-4 ms-2 me-n2" />
        </template>

        <template #title="{ item }">
            {{ item.title }}

            <v-badge v-if="item.emphasized" class="ms-n1" color="success" dot inline />
        </template>

        <template #subtitle="{ item }">
            <span v-if="item.subtitle" class="text-high-emphasis">
                {{ item.subtitle }}
            </span>
        </template>

        <template #subheader="{ props: subheaderProps }">
            <slot name="subheader" v-bind="{ subheaderProps }" />

            <v-list-subheader
                v-if="!$slots.subheader"
                class="text-high-emphasis text-uppercase font-weight-black"
            >
                {{ subheaderProps.title }}
            </v-list-subheader>
        </template>
    </v-list>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Prop } from 'vue'

export type Item = {
    title?: string
    subtitle?: string
    appendIcon?: string
    activeIcon?: string
    inactiveIcon?: string
    items?: (string | Item)[]
    subheader?: string
    divider?: boolean
    href?: string
    subfolder?: string
    disabled?: boolean
    routeMatch?: string
    routePath?: string
    emphasized?: boolean
    onClick?: () => void
}

function generateListItem(item: string | Item): any {
    const isString = typeof item === 'string'
    const isParent = !isString && item.items
    const isType = !isString && (item.divider || item.subheader)

    if (isString || (!isParent && !isType)) {
        const litem = isString ? { title: item } : item

        return {
            title: litem.title,
            href: litem.href,
            subtitle: litem.subtitle && te(litem.subtitle) ? t(litem.subtitle) : litem.subtitle,
            emphasized: false,
            disabled: true
        }
    } else if (item.divider) {
        return {
            type: 'divider'
        }
    } else if (item.subheader) {
        return {
            title: t(item.subheader),
            type: 'subheader'
        }
    } else if (item.items) {
        return {
            title: t(item.title!),
            emphasized: item.emphasized,
            children: item.items.map((item) => generateListItem(item))
        }
    }

    return item
}

function generateListItems(item: Item): any {
    if (!item.items) return undefined
    return item.items.map((child) => generateListItem(child))
}

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    } as Prop<Item[]>,
    nav: Boolean
})

const { t, te } = useI18n()
const opened = ref<string[]>([])

const computedItems = computed(
    () =>
        props.items?.map((item) => {
            if (item.divider || item.subheader) return generateListItem(item)

            const title = item.title && te(item.title) ? t(item.title) : item.title

            return {
                ...generateListItem({
                    title,
                    href: item?.href
                }),
                onClick: item?.onClick,
                rel: item.href ? 'noopener noreferrer' : undefined,
                target: item.href ? '_blank' : undefined,
                children: generateListItems(item),
                prependIcon: opened.value.includes(title ?? '')
                    ? item.activeIcon
                    : item.inactiveIcon,
                value: title,
                appendIcon: item.appendIcon,
                disabled: item.disabled
            }
        })
)
</script>
