<!-- Source: https://github.com/GetnCode/vue3-dropdown-->
<template>
  <!-- Main dropdown container -->
  <span ref="dropdown" class="dropdown">
    <!-- Trigger slot: defines the element that opens the dropdown.
         It receives a 'toggle' prop to control the dropdown state. -->
    <slot name="trigger" :toggle="toggleDropdown"></slot>

    <!-- Teleport: moves the dropdown menu to the body to avoid overflow issues -->
    <Teleport v-if="isOpen" to="body">
      <!-- Transition: applies a slide-in/slide-out animation to the dropdown -->
      <transition name="slide-menu" appear>
        <!-- Dropdown menu: the actual dropdown content -->
        <div v-if="isOpen" ref="dropdownMenu" :class="{ 'dropdown-menu': true }" role="menu">
          <!-- Arrow: a visual cue indicating the dropdown's anchor point -->
          <div ref="arrow" class="arrow"></div>
          <!-- Inner container: provides padding and styling for the dropdown content -->
          <div
            :class="{
              'dropdown-menu-inner': true,
              [dropdownMenuClass]: dropdownMenuClass,
              'position-relative': true,
            }"
            style="z-index: 2000"
          >
            <!-- Default slot: where the dropdown items are placed.
                 It also receives a 'toggle' prop to close the dropdown. -->
            <slot :toggle="toggleDropdown" />
          </div>
        </div>
      </transition>
    </Teleport>
  </span>
</template>

<script>
import { computePosition, flip, shift, offset, autoUpdate, arrow } from '@floating-ui/dom'

export default {
  name: 'Dropdown',
  props: {
    placement: { type: String, default: 'bottom' }, // Dropdown placement relative to the button
    alignment: { type: String, default: 'center' }, // Dropdown alignment (left, center, right)
    dropdownMenuClass: { type: String, default: '' }, // Custom CSS class for the dropdown menu
    offset: { type: Number, default: 18 }, // Offset of the dropdown from the button
  },

  data() {
    return {
      isOpen: false, // Controls the visibility of the dropdown
      cleanup: null, // Stores the cleanup function for the autoUpdate middleware
    }
  },

  beforeUnmount() {
    // Cleanup event listeners and autoUpdate when the component is unmounted
    this.cleanup?.()
    document.removeEventListener('click', this.handleOutsideClick)
    window.removeEventListener('resize', this.updateDropdownPosition)
    window.removeEventListener('scroll', this.updateDropdownPosition, true)
  },
  methods: {
    // Toggles the dropdown visibility
    toggleDropdown() {
      this.isOpen = !this.isOpen

      if (this.isOpen) {
        // If the dropdown is opening, set up its position using Floating UI
        this.$nextTick(this.setupPosition)
        document.addEventListener('click', this.handleOutsideClick)
      } else {
        // If the dropdown is closing, remove the event listener and cleanup Floating UI
        document.removeEventListener('click', this.handleOutsideClick)
        this.cleanup?.()
      }
    },

    // Sets up the dropdown's position using Floating UI
    setupPosition() {
      const reference = this.$refs.dropdown // The reference element (the button)
      const floating = this.$refs.dropdownMenu // The floating element (the dropdown menu)
      const arrowElement = this.$refs.arrow // The arrow element

      if (!reference || !floating) return

      // Use autoUpdate to keep the dropdown positioned correctly
      this.cleanup = autoUpdate(reference, floating, () => {
        // Map alignment prop to Floating UI's alignment options
        const alignmentMap = {
          left: 'start',
          right: 'end',
          center: 'center',
        }

        const placement = `${this.placement}-${alignmentMap[this.alignment] || 'center'}`

        // Compute the dropdown's position
        computePosition(reference, floating, {
          strategy: 'fixed', // Use fixed positioning for better performance
          placement,
          middleware: [
            offset(this.offset), // Apply the specified offset
            flip({ padding: 8 }), // Flip the dropdown if it overflows the viewport
            shift({ padding: 8 }), // Shift the dropdown to keep it within the viewport
            arrow({ element: arrowElement }), // Position the arrow element
          ],
        }).then(({ x, y, placement: actualPlacement, middlewareData }) => {
          // Apply the computed position to the dropdown
          Object.assign(floating.style, {
            position: 'fixed',
            left: `${x}px`,
            top: `${y}px`,
            zIndex: 2000,
          })

          // Position the arrow element
          const { x: arrowX, y: arrowY } = middlewareData.arrow

          const staticSide = {
            top: 'bottom',
            bottom: 'top',
            left: 'right',
            right: 'left',
          }[actualPlacement.split('-')[0]]

          Object.assign(arrowElement.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : '',
            [staticSide]: '-10px',
            position: 'absolute',
            zIndex: 1999,
          })
        })
      })
    },

    // Handles clicks outside the dropdown to close it
    handleOutsideClick(event) {
      // Don't close if clicking inside the dropdown or its submenus
      if (
        this.$refs.dropdown?.contains(event.target) ||
        event.target.closest('.dropdown-submenu')
      ) {
        return
      }

      const isOutside = !this.$refs.dropdownMenu?.contains(event.target)
      if (isOutside) {
        this.isOpen = false
      }

      if (
        event.target.classList.contains('dropdown-item') ||
        event.target.parentElement.classList.contains('dropdown-item') ||
        event.target.parentElement.parentElement.classList.contains('dropdown-items')
      ) {
        this.isOpen = false
      }
    },
    // Remove or comment out updateDropdownPosition method as it's no longer needed
    // updateDropdownPosition() { ... }
  },
}
</script>

<style scoped>
.dropdown-menu {
  position: fixed;
  margin: 0;
  padding: 0;
  min-width: 150px;
  background: var(--c-dark-red);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transform-origin: top;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  z-index: 2080;
}

.dropdown-menu-inner {
  position: relative;
  border-radius: 4px;
  padding: 0.75rem;
}

/* Replace the .dropdown-menu::before with .arrow */
.arrow {
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--c-dark-red);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  transform: rotate(45deg);
  z-index: -1;
}

.slide-menu-enter-active,
.slide-menu-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.slide-menu-enter-from,
.slide-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.slide-menu-enter-to,
.slide-menu-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.dropdown-menu.has-submenu {
  overflow: visible !important;
  position: fixed;
  transform-origin: top center;
}
</style>
