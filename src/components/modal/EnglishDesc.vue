<template>
    <section class="english-desc modal">
        <h1>Уровни английского</h1>
        <div>
            <p class="title">
                Beginner (начальный)
            </p>
            <p class="desc">
                Азы, основы языка. Базовый словарный запас.
            </p>
        </div>
        <div>
            <p class="title">
                Elementary (элементарный)
            </p>
            <p class="desc">
                Чтение диалогов, базовая грамматика, несложное аудирование.
            </p>
        </div>
        <div>
            <p class="title">
                Pre-intermediate (слабый средний)
            </p>
            <p class="desc">
                Умение общаться на языке в повседневных ситуациях. Четкое выражение мыслей.
            </p>
        </div>
        <div>
            <p class="title">
                Intermediate (средний)
            </p>
            <p class="desc">
                Коммуникация с носителями языка. Знание деловой речи.
            </p>
        </div>
        <div>
            <p class="title">
                Upper-intermediate (выше среднего)
            </p>
            <p class="desc">
                Свободное общение, глубокое знание грамматики. Правильное произношение.
            </p>
        </div>
        <div>
            <p class="title">
                Advanced (продвинутый)
            </p>
            <p class="desc">
                Уровень, приближенный к носителям языка.
            </p>
        </div>
    </section>
</template>

<style lang="scss">
.english-desc {
    p {
        line-height: 1.3;
    }
    div:not(:last-of-type) {
        margin-bottom: 28px;
    }
    div:last-of-type {
        margin-bottom: 20px;
    }
    .title {
        font-weight: bold;
        margin-bottom: 6px;
    }
}
</style>
