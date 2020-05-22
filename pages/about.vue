<template>
  <div class="about">
    <main>
      <div class="about-content-wrapper">
        <div class="about-container">
          <div class="about-content">
            <h1>About</h1>

            <h3>On the Effectiveness of Peace Operations Visualization Tool (EPOT)</h3>

            <p>The Effectiveness of Peace Operations Visualization Tool (EPOT) is an interactive web-based visualization to show complexity in peace operations based on the methodology of the Effectiveness of Peace Operations Network (EPON). The EPOT is a qualitative tool that aids description and understanding of peace operations, rather than a quantitative tool.</p>
            <p>The EPOT is designed to visualize the complexity of peace operations and help its understanding. Through visualization of explanatory factors, different aspects of peace operations and their interconnections, the EPOT makes research more accessible and usable increasing the impact of EPON’s research. The EPOT can also support the research conducted in the field.</p>

            <h3>More specifically, the tool is designed to</h3>
            <ul>
              <li>Provide a visualization of the complexity of peace operations.</li>
              <li>Ease understanding of the number of issues to be considered in research on peace operations, and the relationships between these issues.</li>
              <li>Highlight central research findings.</li>
              <li>Contribute to the comparability of the research conducted in EPON.</li>
            </ul>

            <h3>The EPOT has three components</h3>
            <ol>
              <li>Six explanatory factors derived from the EPON methodology as well as aspects of these factors that help to provide a more detailed picture.</li>
              <li>The connections between and among explanatory factors and aspects. These connections are not causal and can be tailored to a specific case</li>
              <li>Brief text on each explanatory factor and each aspect.</li>
            </ol>

            <h3>The EPOT encourages</h3>
            <ul>
              <li>Learning: Users can explore the complexity of peace operations in general as well as the association of various aspects and explanatory factors by hovering, clicking and highlighting.</li>
              <li>Tailoring: The EPOT can be tailored to a specific case or peace operation by selecting explanatory factors, aspects, and connections as well as inserting own text.</li>
              <li>The tool is designed to be versatile in use and as such can be used for a number of target audiences including the research community, political decision makers or local peace builders.</li>
            </ul>

            <h3>On the Effectiveness of Peace Operations Network (EPON)</h3>
            <p>EPON is an international network of over 40 partners established by the Norwegian Institute of International Affairs (NUPI), which undertakes research into the effectiveness of peace operations.</p>

            <h3>On the partners</h3>
            <p>
              <a href="https://www.zif-berlin.org/en.html" target="_blank">The Berlin Center for International Peace Operations (ZIF)</a> was established in 2002. ZIF’s mandate includes training, recruitment, deployment and support of civilian personnel for peace operations and election monitoring missions, providing analyses and policy advice on peace operations as well as on the improvement of structures and processes of international partner organizations.
              <br><br>
              <a href="https://www.futurice.com/" target="_blank">Futurice</a> is a digital service and innovation agency. We employ over 500 professionals in technology, design and business. Our offices are located in Helsinki, Tampere, London, Berlin, Munich, Stuttgart, and Oslo.
              <br><br>
              <a href="https://saferglobe.fi/en/" target="_blank">SaferGlobe</a> is Finland´s leading independent think tank on peace and security. We combine cross-disciplinary knowledge with technology to create new understanding.
            </p>

            <p id="logos">
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

          h3 {
            font-size: 18px;
            margin: 2em 0 0.5em;
          }

          ul, ol {
            margin-left: 20px;
            font-size: 15px;
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

          p#logos {
            padding-top: 3em;
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
