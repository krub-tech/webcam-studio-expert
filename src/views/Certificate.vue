<template>
    <section class="certificate-page">
        <aside class="certificate-page--nav">
            <ul>
                <li>Студиям</li>
                <li>Специалистам</li>
            </ul>
        </aside>
        <main class="certificate-page--content">
            <div class="certificate-page--title">
                <button class="btn-back" @click="$router.go(-1)" />
                <h1>Сертификация веб-студии</h1>
                <button
                    class="certificate-page--btn-proposal-header"
                    @click="
                        $store.dispatch('updateModal', {
                            name: 'Certification',
                        })
                    "
                >
                    Оставить заявку
                </button>
            </div>
            <section class="certificate-page--text">
                <h2>Почему студии нужно сертифицировать? И почему именно мы этим занимаемся? Почему именно мы?</h2>
                <p>
                    Уже много лет мы выступаем за повышение экологичности бизнеса, за развитие индустрии, за готовность
                    и открытость к сотрудничеству. Наша задача - тщательно оценивать студии что бы они отвечали не
                    только нашим параметрам, но и постоянно меняющимся требованиям рынка. Как и в любом бизнесе есть
                    недобросовестные компании. Мы придерживаемся политики что хорошая студия - это не только компьютер и
                    интерьер, но и поддержка и помощь моделям в достижении результатов Именно по этому мы предлагаем
                    сертификацию студий - для снижения рисков у моделей и для повышения качества индустрии в общем и
                    студий в частности. Мы не первые кто задумался о контроле качества студий, но мы первые кто
                    реализовывает данное направление по настоящему качественно и честно. Плохие и хорошие отзывы
                    зачастую пишутся самими работодателями или конкурентами. Мы же - независимая и не заинтересованная
                    компания проводящая оценку различными способами для выявления всех плюсов и минусов студии.
                </p>
            </section>
            <img src="@/assets/img/certificate.png" alt="Сертификат Webcam Studio Expert">
            <!-- <Slider :data="slides" /> -->
            <section class="certificate-page--text">
                <h3>Какими же качествами должна обладать студия, для того чтобы пройти сертификацию?</h3>
                <h4>Помещение</h4>
                <ol>
                    <li>Изолированные комнаты</li>
                    <li>Чистота рабочих и общих зон</li>

                    <li>Наличие окон/хорошей вентиляции (для обеспечения проветривания и притока свежего воздуха)</li>
                    <li>
                        Климат контроль (наличие обогревателей/вентиляторов/кондиционеров для обеспечения комфортности
                        работы)
                    </li>
                    <li>Отличное освещение, помогающее грамотно настроить свет</li>
                </ol>
                <h4>Техника</h4>
                <ol>
                    <li>Компьютеры с возможностью запуска от 6 сайтов</li>
                    <li>Мониторы от 27 дюймов</li>

                    <li>Наличие более современных камер, чем с920, с922, с925</li>
                </ol>
                <h4>Общее</h4>
                <ol>
                    <li>Прозрачность и своевременность выплат</li>
                    <li>Наличие бонусов</li>
                    <li>Адекватные штрафы</li>
                    <li>Отсутствие принуждения и шантажа</li>
                    <li>Регулярность создания контента</li>
                    <li>Наличие субординации</li>
                    <li>Наличие места под хранение вещей</li>
                    <li>Наличие гримерной зоны</li>
                    <li>Своевременное решение технических проблем</li>
                    <li>Наличие душа</li>
                    <li>Адекватность руководства и админского состава</li>
                    <li>Достаточный уровень знаний у администраторов</li>
                </ol>
            </section>
            <button
                class="certificate-page--btn-proposal-footer"
                @click="$store.dispatch('updateModal', { name: 'Certification' })"
            >
                Оставить заявку
            </button>
            <div class="certificate-page--contacts">
                <p>
                    <a href="tel:+78126428980">+7 (812) 642-89-80</a>
                </p>
                <div>
                    <a :href="`https://wa.me/+78126428980`" class="certificate-page--btn-whtsp" />
                    <a :href="`viber://add?number=+78126428980`" class="certificate-page--btn-viber" />
                </div>
            </div>
        </main>
    </section>
</template>

<script>

export default {
  name: 'Certificate',
  data() {
    return {
      slides: [],
    };
  },
  mounted() {
    this.getSlides();
  },
  methods: {
    getSlides() {
      for (let i = 1; i <= 6; i++) {
        fetch(`https://picsum.photos/200/300?random=${i}`).then((response) => this.slides.push(response.url));
      }
    },
  },
};
</script>

<style lang="scss">
@mixin small-point {
    position: relative;
    margin-right: 30px;
    &::after {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        top: 50%;
        transform: translateY(-25%);
        border-radius: 50%;
        background-color: var(--black);
        opacity: 0.1;
        right: -18px;
        @content;
    }
}

.certificate-page {
    // height: calc(100vh - 448px);

    .slider {
        height: 200px;
        margin-bottom: 40px;
    }
}

.certificate-page--nav {
    display: none;

    ul {
        width: 320px;
        border-radius: 20px;
        overflow: hidden;
        margin: 0 auto;
    }

    li {
        width: 100%;
        height: 56px;
        position: relative;
        display: flex;
        align-items: center;
        background-color: #fefeff;
        border-bottom: 1px solid var(--grey);
        padding-left: var(--fr);

        &::after {
            content: attr(count);
            position: absolute;
            color: #8b8ba3;
            right: 20px;
        }
    }
}

.certificate-page--content {
    display: block;
    height: max-content;
    width: 100%;
    background-color: #fefeff;
    border-radius: 10px;
    padding: 30px;

    h1 {
        font-size: 22px;
        color: #222226;
    }
}

.certificate-page--title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.certificate-page--btn-proposal-header,
.certificate-page--btn-proposal-footer {
    height: var(--fr-2);
    background: linear-gradient(86.42deg, #b4dbff 0%, #bef3ff 100%);
    border-radius: 0.5rem;
    padding: var(--fr-m) 1rem;
}

.certificate-page--btn-proposal-header {
    display: none;
}

.certificate-page--btn-proposal-footer {
    width: 100%;
    margin: 40px 0;
}

.certificate-page--text {
    padding: 40px 0;
    &:last-of-type {
        padding-bottom: 0;
    }
    h2 {
        font-size: 20px;
        line-height: 1.2;
        margin-bottom: 20px;
    }
    h3 {
        font-size: 18px;
        line-height: 1.2;
        margin-bottom: 20px;
    }
    h4 {
        margin-bottom: 10px;
    }
    p {
        line-height: 1.25;
    }

    ol {
        counter-reset: cnt;
        margin-bottom: 16px;
        li {
            line-height: 1.2;
            list-style: none;
            position: relative;
            padding-left: 30px;
            margin-bottom: 6px;
            &::before {
                counter-increment: cnt;
                content: counter(cnt) ".";
                position: absolute;
                width: 20px;
                display: flex;
                justify-content: center;
                left: 0;
            }
        }
    }
}

.certificate-page--contacts {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        color: #222226;
        @include small-point;
    }

    div {
        display: flex;
        align-items: center;
    }
}

.certificate-page--btn-whtsp,
.certificate-page--btn-viber {
    width: 1.5rem;
    height: 1.5rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.certificate-page--btn-whtsp {
    background-image: url("~@/assets/svg/i-whatsapp.svg");
    @include small-point;
}

.certificate-page--btn-viber {
    background-image: url("~@/assets/svg/i-viber.svg");
}

@media screen and (min-width: 420px) {
    .certificate-page {
        min-height: calc(100vh - 448px);
        display: grid;
        grid-template-areas: "aside certificate-page";
        grid-template-columns: 320px max-content;
        padding: 50px 0;

        .slider {
            height: 360px;
            margin-bottom: 40px;
        }
    }
    .certificate-page--nav {
        display: block;
        grid-area: aside;

        ul {
            margin: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
    .certificate-page--content {
        width: 640px;
        padding: 40px;
        margin-left: 40px;
    }
    .certificate-page--title {
        padding-bottom: 30px;
        border-bottom: 1px solid #eeeef6;
    }
    .certificate-page--btn-proposal-header {
        display: block;
    }
    .certificate-page--btn-proposal-footer {
        display: none;
    }
    .certificate-page--contacts {
        justify-content: flex-start;
        margin-top: 40px;
        padding-top: 40px;
        border-top: 1px solid #eeeef6;
    }
}

@media screen and (min-width: 1360px) {
    .certificate-page {
        justify-content: center;
    }
    .certificate-page--nav {
        ul {
            border-radius: 20px;
        }
    }
}
</style>
