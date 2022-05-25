app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    `
        <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <!-- 이미지 들어갈 곳 -->
                <!-- <img v-bind:src="image"> -->
                <img :src="image">
            </div>

            <div class="product-info">

                <!-- computed 메소드 호출 -->
                <h1>{{ title }}</h1>

                <p v-if="onSale"> {{ saleMessage }} </p>
                <!--                    <h1>{{product}}</h1>-->
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                
                <p>Shipping: {{ shipping }}</p>
                <!--                    &lt;!&ndash; vue if 문 쓰기 &ndash;&gt;-->
                <!--                    <p v-if="inventory > 10">상품재고 있음</p>-->
                <!--                    <p v-else-if="inventory <= 10 && inventory > 0">-->
                <!--                        상품재고가 줄어드는 중</p>-->
                <!--                    <p v-else>상품재고 없음</p>-->
                <!--                    &lt;!&ndash; 연습문제 &ndash;&gt;-->
                <!--                    <p v-if="onSale">세일 중</p>-->

                <!-- ul 반복문 -->
                <ul>
                    <li v-for="detail in details">
                        {{ detail }}
                    </li>
                </ul>

                <!-- 객체 배열 반복문 예제   -->
                <ul>
                    <li v-for="(variant, index) in variants"
                        :key="variant.id"
                        @mouseover="updateImage(index)"
                        class="color-circle"
                        :style="{ 'background-color' : variant.color }">
                        <!-- v-on:mouseover="updateImage(variant.images)" -->
                        <!-- {{ variant.color }} -->
                    </li>
                </ul>
                <!-- 장바구니 추가 버튼-->
                <button class="button"
                        :class="{ disabledButton : !inStock }"
                        :disabled="!inStock"
                        @click="addToCart">
                    Add To Cart
                </button>
                <!--                    &lt;!&ndash; 장바구니 삭제 버튼 연습문제&ndash;&gt;-->
                <!--                    <button class="button"-->
                <!--                            @click="deleteToCart">-->
                <!--                        Delete To Cart-->
                <!--                    </button>-->
            </div>
        </div>
    </div> <!-- product display end -->
    `
    ,
    data() {
        return {
            // 연습문제
            onSale: true,
            product : 'Socks',
            brand : 'Vue Mastery',
            selectedVariant: 0,
            details : ['50% cotton', '30% wool', '20% polyester'],
            variants : [
                // 0번 객체
                {
                    id : 2234,
                    color : 'green',
                    images : './assets/images/socks_green.jpg',
                    quantity: 50
                },
                // 1번 객체
                {
                    id : 2235,
                    color : 'blue',
                    images : './assets/images/socks_blue.jpg',
                    quantity: 0
                },
            ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateImage(index){
            // 이미지 경로 대신 숫자로 처리
            // 매개변수 index : 0, 1
            this.selectedVariant = index;
        }
        // updateImage(variantImage) {
        //     this.image = variantImage;
        // },

        // deleteToCart() {
        //     if(this.cart > 0) {
        //         this.cart -= 1;
        //     }
        // }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            // 0번 : greenSocks.jpg
            // 1번 : blueSocks.jpg
            return this.variants[this.selectedVariant].images
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        saleMessage() {
            return this.brand + ' ' + this.product + ' is on sale'
        },
        shipping() {
            if(this.premium) {
                return 'Free'
            } else {
                return '$2.99'
            }
        }
    }
})