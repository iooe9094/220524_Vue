app.component('review-form', {
    template:
    `
        <form class="review-form" @submit.prevent="onSubmit">
            <h3>Leave a review</h3>
            <label for="name">Name: </label>
            <input id="name" v-model="name">

            <label for="review">Review: </label>
            <textarea id="review" v-model="review"></textarea>

            <label for="rating">Rating: </label>
            <select id="rating" v-model="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
            <input class="button" type="submit" value="Submit">
        </form>
    `,
    data() {
        return {
            name: '',
            review: '',
            rating: null
        }
    },
    methods: {
        onSubmit() {
            // 양식 체크 먼저 해서 에러 처리를 함
            // 유효성 체크 (자리수, 빈문자)
            if (this.name == '' || this.reivew == '' || this.rating == null) {
                alter('Review is incomplete. Please fill out every filed')
                return;
            }

            // 여기서부터는 에러 처리를 통과 했으므로 정상적인 처리를 진행함
            // 객체 생성 부분
            let productReivew = {
                name : this.name,
                review : this.review,
                rating : this.rating
            }
            // 부모쪽으로 데이터 전송, 사용자 이벤트(click, mousemove) 정의
            this.$emit('review-submitted', productReivew)
        }
    }
})