import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

type ApplicationState = {
    showHero: boolean
}

export const useApplicationStore = defineStore('application', () => {
//     state: () => ({
//         showHero: false,
//     }),
//     actions: {
//         hideHero() {
//             this.showHero = false
//         }
//     }
// });

    const state: ApplicationState = reactive<ApplicationState>({
        showHero: true
    })

    return {
        ...toRefs(state),
        actions: {
            hideHero() {
                state.showHero = false;
            },
            showHero() {
                state.showHero = true;
            }
        }
    }
})
