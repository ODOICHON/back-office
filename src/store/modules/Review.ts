import { saveReview } from "@/api/Review";
import { ReviewReq } from "@/types/ReviewType";
import { Module } from "vuex";

export const reviewModule : Module<any, any> = {
    state : {
        reviewId : 0
    },
    mutations : {
        setReviewId(state, reviewId : number) {
            state.reviewId = reviewId;
        }
    },
    actions: {
        async saveReview({commit, rootState}, req: ReviewReq) {
            try {
                const headers = {
                 Authorization: `${rootState.auth.access_token}`,
               };
               const response = await saveReview(req, headers);
               commit('setReviewId', response.data.data);
             } catch (error) {
               console.error(error);
             }
        }
    }
}