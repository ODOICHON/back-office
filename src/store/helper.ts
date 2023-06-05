import { mapGetters } from "vuex";

export const authComputed = {
    ...mapGetters(['loggedIn'])
};

export const reviewComputed = {
    ...mapGetters(['reviewFilter'])
};
export const getCurrentUser = {
    ...mapGetters(['currentUser'])
}