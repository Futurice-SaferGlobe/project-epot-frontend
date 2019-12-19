<template>
  <div class="about">
    <main>
      <div class="about-content-wrapper">
        <div class="about-container">
          <div class="about-content">
            <h1>About</h1>
            <p class="about-intro-text">
              EPON is an international network of over 40 partners established by the Norwegian
              Institute of International Affairs (NUPI), which undertakes research into the effectiveness
              of peace operations. For further information, see
              <a href="https://effectivepeaceops.net/" target="_blank">effectivepeaceops.net</a>.
            <br>
            <br>
              The Effectiveness of Peace Operations Tool (EPOT) is a tool designed to provide an
              interactive web-based visualization of the complexity of peace operations. It aims to ease
              understanding of multiple issues to be considered in research on peace operations, and the relationship
              between these issues. It highlights central research findings and contributes to the comparability of
              research conducted in EPON as well as supports the research conducted in the field.
              The visualization aims to make research more accessible and usable and, in turn, increase its impact.
            <br>
            <br>
              The Effectiveness of Peace Operations Tool was created in collaboration with
              <a href="https://www.zif-berlin.org/en.html" target="_blank">Zif Berlin</a>,
              <a href="https://saferglobe.fi/en/" target="_blank">SaferGlobe</a> and
              <a href="https://www.futurice.com/" target="_blank">Futurice</a>.
            <br>
            <br>
              <a href="https://saferglobe.fi/en/" target="_blank"><img class="logo-img" src="/logo-saferglobe.png"></a>
              <a href="https://www.zif-berlin.org/en.html" target="_blank"><img class="logo-img" src="/logo-zif.png"></a>
              <a href="https://www.futurice.com/" target="_blank"><img id="logo-futurice" class="logo-img" src="/logo-futurice.png"></a>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import pageTransition from '@/mixins/pageTransition'
export default {
  mixins: [pageTransition],
  /*data() {
    return {
      elems: null,
      scroll_elem: null,
      elem_positions: null
    }
  },
  methods: {
    calcPositions() {
      const elems = Array.from(document.querySelectorAll('.about-getpos'))
      this.elem_positions = elems.map(e => {
        return e.offsetTop
      })
    },
    updateIndexPos() {
      for(let e of this.elems) {
        const i = e.dataset.navId
        const indexelem = document.querySelector('[data-hl-id="'+i+'"]')
        if(this.isWithinScroller(e)) {
          indexelem.classList.add("about-index-hl")
        } else {
          indexelem.classList.remove("about-index-hl")
        }
      }
    },
    isWithinScroller(elem) {
      const scrollerBottom = this.scroll_elem.offsetTop + this.scroll_elem.clientHeight
      const elemTop = elem.offsetTop - this.scroll_elem.scrollTop
      const elemBottom = elemTop + elem.clientHeight
      return elemTop < scrollerBottom && elemBottom > this.scroll_elem.offsetTop
    },
    scrollPage(e) {
      const id = e.target.dataset.hlId
      this.scroll_elem.scrollTo({
        left: 0,
        top: document.querySelector('[data-nav-id="'+id+'"]').offsetTop - this.scroll_elem.offsetTop,
        behavior: 'smooth'
      })
    }
  },
  mounted() {
    this.elems = Array.from(document.querySelectorAll('.about-getpos'))
    this.scroll_elem = document.querySelector('.about-content-wrapper')
    window.addEventListener("resize", this.updateIndexPos)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateIndexPos)
  }*/
}
</script>

<style lang="scss" scoped>
.about {
  background-color: epot-color('about-bg');
  color: epot-color('about-fg');
  height: 100vh;

  ul, li {
    list-style: inherit;
  }

  li {
    line-height: 1.3em;
  }

  .ulined {
    text-decoration: underline;
  }

  main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-top: 50px;

    .about-content-wrapper {
      flex: 1;
      height: calc(100% - 48px * 2);
      overflow: auto;
      margin-right: 20px;

      &::-webkit-scrollbar {
        background-color: epot-color('about-bg');
        width: 0.8ex;
      }

      &::-webkit-scrollbar-thumb {
        background-color: epot-color('about-fg');
        outline: 1px solid slategrey;
        border-radius: 3px;
      }

      .about-container {
        max-width: 1100px;
        margin: 0 auto 0 0;

        .about-content {
          padding: 50px 30px;
          max-width: 800px;
          margin: 0 auto;

          h1 {
            font-size: 54px;
          }
          .about-intro-text {
            font-size: 18px;
            margin-bottom: 3em;
            text-align:justify;
            word-break:keep-all;
          }

          h2 {
            font-size: 26px;
            margin: 1em;
          }

          ul {
            margin-left: 20px;
            font-size: 18px;
            padding: 0.7em 0;

            li {
              padding: 0.7em 0;
              text-align:justify;
              word-break:keep-all;

              ul {
                list-style-type: circle;
              }
            }
          }

          img.logo-img {
            height: 30px;
            display: inline-block;
            margin-right: 100px;

            &#logo-futurice {
              height: 20px;
            }
          }
        }
      }


    }

  }


}
</style>
