<template>
    <footer>
        <router-link class="Footer-Logo" to="/">HomeLands</router-link>
        <div class="Footer-Info">
            <ul>
                <li>123 Main St.</li>
                <li>Anytown, USA 12345</li>
            </ul>
            <ul>
                <li><a href="mailto:info@example.com">Email: info@homelands.com</a></li>
                <li><a href="tel:+45 1122 3344">Telefon: +45 1122 3344</a></li>
            </ul>
        </div>

        <ul class="Footer__Social-Links">
            <a href="https://www.facebook.com/" target="_blank"><font-awesome-icon class="Icon"
                    icon="fa-brands fa-square-facebook" /></a>
            <a href="https://twitter.com/" target="_blank"><font-awesome-icon icon="fa-brands fa-square-twitter" /></a>
        </ul>

    </footer>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
footer {
    background-color: black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0vw 5vw 0vw 5vw;
    gap: 5vw;
    height: 5vw;
    margin-top: 4vw;

    // 5+5-100
    a {
        color: white;
    }

    .Footer-Logo {
        font-size: 2vw;
    }

    .Footer-Info {
        display: flex;
        justify-content: center;
        gap: 4vw;
    }
}

.Footer__Social-Links {
    display: flex;
    gap: 1vw;
    font-size: 1.7vw;
    margin-left: auto;
    padding-right: 1vw;

    a {
        &:hover {
            color: #4267B2;
        }
    }
}
</style>