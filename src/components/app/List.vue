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

/**
 * The list item.
 */
export interface ListItem {
    to?: string
    /**
     * The unique identifier of the list item.
     */
    uuid?: string
    /**
     * The link of the list item.
     */
    href?: string
    /**
     * The children of the list item.
     */
    items?: (string | ListItem)[]
    /**
     * The title of the list item.
     */
    title?: string
    /**
     * The click event of the list item.
     */
    onClick?: () => void
    /**
     * Whether the list item is a divider.
     */
    divider?: boolean
    /**
     * The subtitle of the list item.
     */
    subtitle?: string
    /**
     * Whether the list item is disabled.
     */
    disabled?: boolean
    /**
     * The subfolder of the list item.
     */
    subfolder?: string
    /**
     * The subheader of the list item.
     */
    subheader?: string
    /**
     * The icon to display before the list item.
     */
    appendIcon?: string
    /**
     * The icon to display when the list item is active.
     */
    activeIcon?: string
    /**
     * Whether the list item is emphasized.
     */
    emphasized?: boolean
    /**
     * The icon to display when the list item is not active.
     */
    inactiveIcon?: string
}

function generateListItem(item: string | ListItem): any {
    const isString = typeof item === 'string'
    const isParent = !isString && item.items
    const isType = !isString && (item.divider || item.subheader)

    if (isString) {
        return {
            title: item,
            emphasized: false,
            disabled: true
        }
    } else if (!isParent && !isType) {
        return {
            title: item.title,
            href: item.href,
            subtitle: item.subtitle && te(item.subtitle) ? t(item.subtitle) : item.subtitle,
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

function generateListItems(item: ListItem): any {
    if (!item.items) return undefined
    return item.items.map((child) => generateListItem(child))
}

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    } as Prop<ListItem[]>,
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
