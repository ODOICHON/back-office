import { getReview, saveReview } from "@/api/Review";
import { ReviewRecordType, ReviewReq } from "@/types/ReviewType";
import { Module } from "vuex";

export const reviewModule : Module<any, any> = {
    state : {
        reviewId : 0,
        review: {} as ReviewRecordType
    },
    mutations : {
        setReviewId(state, reviewId : number) {
            state.reviewId = reviewId;
        },
        setReview(state, review: ReviewRecordType) {
            state.review = review;
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
        },
        async getReview({commit, rootState}, id: number) {
            try {
                const headers = {
                    Authorization: `${rootState.auth.access_token}`,
                };
                const response = await getReview(id, headers);
                commit('setReview', response.data.data);
            } catch (error) {
                
            }
        }
    }
}