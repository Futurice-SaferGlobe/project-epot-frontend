<template>
  <div class="about">
    <main>
      <div class="about-content-wrapper">
        <div class="about-container">
          <div v-if="selectedOperation === 'fututest'" class="about-content">
            <h1>Effects of peace operations</h1>
            <p class="about-intro-text">Typically, the underlying objective of a peace operation is reducing the conflict dynamics in the area
                of operation, including by preventing violent conflict, increasing stability and protecting civilians, and
                building   and   fostering   sustainable   peace.   The   following   is   a   non-exhaustive   list   of   possible
                contributions a peace operation can make to promote these objectives, many of which can be among
                the   mandated   tasks   of   a   peace   operation.   Not   all   peace   operations   attempt   to   make   all   these
                contributions; the list is simply intended to suggest contributions that a researcher might look for in
                each case in order to help answer the question:
                <b>what effects did the peace operation produce?</b>
            </p>
            <ul>
              <li class="about-getpos" data-nav-id="1">
                <b>Preventing Conflict:</b>
                Prevention can take different shapes, comprise a wide range of actions
                and address conflict at different stages:
                <ul>
                  <li>
                    <i>Preventing/averting imminent escalation</i>
                    or outbreak of violence (direct prevention) means
                    preventing disputes from escalating into conflict, including mediation and local
                    conflict management e.g. leading or supporting national and local cease-fire or peace
                    agreements, supporting local peace agreements and local peace committees.
                  </li>
                  <li>
                    <i>Preventing the recurrence</i>
                      of conflict entails taking deterrent action to support a
                      cease-fire or truce implementation mechanisms and other forms of deterrence to
                      prevent recurrence of conflict.
                  </li>
                  <li>
                    <i>Indirect or structural prevention</i>, i.e. actions, steps or initiatives the peace operation
                    has taken to influence the underlying structural causes that generate risks to the civilian population.
                  </li>
                </ul>
              </li>
              <li class="about-getpos" data-nav-id="2">
                <b>Building confidence:</b>
                Most activities of peace operations serve the underlying purpose of
                building confidence, i.e. to contribute to an environment that is conducive to fostering and
                increasing mutual confidence between the conflict parties or even within parties. Following a
                conflict, mistrust among communities and conflict parties may need to be dismantled before
                confidence can be developed. Confidence building is a key mechanism for repairing societal
                bonds after conflict and can be pursued through dialogue processes, capacity building or
                advocacy.
              </li>
              <li class="about-getpos" data-nav-id="3">
                <b>Stabilisation:</b>
                Enhancing stability is a core function of any peace operation, and includes how
                the presence and actions of a peace operation contribute to
                creating and maintaining a more
                secure environment at local,
                national and regional levels. Ensuring a secure environment is
                particularly relevant in areas where there may be residual conflict-related violence. In some
                cases, this may involve
                actions to counter, disrupt or neutralise armed groups.
              </li>
              <li class="about-getpos" data-nav-id="4">
                <b>Protecting civilians:</b>
                Since 1999, many peace operations have focused on the protection of
                civilians (PoC). PoC is a whole-of-mission endeavour where all components – military, police,
                and civilian – contribute to the implementation of the PoC mandate. PoC goes beyond
                protecting   civilians   from   immediate   physical   harm   through
                deterrence,   intervention   or offensive   operations
                and includes protection through dialogue and engagement, e.g.
                supporting   of  political  processes  or   conflict  management   and  reconciliation,   as  well  as
                creating protective environments by maintaining law and order or strengthening host-state
                security services that respect human rights and the rule of law.
              </li>
              <li class="about-getpos" data-nav-id="5">
                <b>Strengthening public safety:</b>
                Beyond the mere protection from crime, as this also refers to
                the welfare of the general public, including a range of issues such as traffic safety, harassment
                or natural disasters. Safeguarding public safety and a secure environment has been a core
                mandated task from the early days of peacekeeping and is based on the rationale that people
                will be more willing to engage in a peace process if there is some guarantee of their safety. For
                people living in (post)conflict areas, feeling safe is linked to the provision of public safety
                either through national security providers or the presence of an international peace operation.
                <i>Through which activities and engagements does the peace operation aim to strengthen public
                safety? How have these affected the perception of public safety?</i>
              </li>
              <li class="about-getpos" data-nav-id="6">
                <b>Promoting   human   rights:</b>
                Conflicts   are   often   accompanied   by   serious   human   rights
                violations and impunity for the perpetrators. Peace operations engage in a host of activities,
                ranging from protecting and promoting
                human rights through long-term measures, such as
                strengthening human rights laws and associated legal practices, to reduce impunity and
                address associated grievances.
                As part of their shorter-term protection and stabilisation remit,
                tasks include monitoring human rights, empowering populations to demand respect for their
                rights, and enabling government institutions to fulfil their human rights commitments.
              </li>
              <li class="about-getpos" data-nav-id="7">
                <b>Preventing CRSV and SGBV:</b>
                The protection of women and men from sexual and gender-
                based/conflict-related sexual violence (SGBV/CRSV) during and after armed conflict is an
                essential part of the UN’s protection agenda. Preventing and addressing SGBV/CRSV is an
                integrated and prioritised element in a peace operation’s protection strategy.
              </li>
              <li class="about-getpos" data-nav-id="9">
                <b>Promoting national reconciliation:</b>
                National reconciliation  creates a  foundation  for  the
                lasting settlement of conflicts and is often a key element of the political process. While peace
                operations can provide the space (political or security) for a reconciliation process to take
                place, the process is unlikely to succeed unless national counterparts carry it forward and it is
                structured to address concerns, fears, and grievances of the population (see also
                ‘people-centred approaches’).
              </li>
              <li class="about-getpos" data-nav-id="10">
                <b>Contributing to peace dividends:</b>
                Peace dividends are the benefits accrued by the population
                from a peace process or peace operation. More immediate peace dividends can contribute to
                confidence in the political process and
                in the ability of communities to co-exist, as well as
                delivering tangible improvements for the population.
              </li>
              <li class="about-getpos" data-nav-id="11">
                <b>Extension   of   State  Authority   (ESA):</b>
                Extending   or   restoring   state   authority   means
                strengthening the state presence in more remote areas where the state has not been present or
                has been unable to deliver basic public goods. In the context of protection and stabilisation,
                the extension of state authority is often related to public safety and access to justice. Peace
                operations’ efforts on ESA often consist of building host-state institutions, particularly in the
                security and justice sectors, strengthening the rule of law and supporting community policing.
              </li>
              <li class="about-getpos" data-nav-id="12">
                <b>Supporting institution building and development:</b>
                Weak  institutions  and  poor   service
                delivery are both causes and consequences of conflict. Conflict aggravates the fragility of
                institutions, which are no longer able to function properly or take care of the day-to-day
                governing of the country. Institutions may also be bloated, lack capacity or be poorly managed
                or structured. Peace operations have increasingly taken on institution building in the areas of
                rule of law, in the security sector or as part of the extension of state authority. The aim is to
                empower host-state authorities to be effective national owners and drivers of a peace process.
                Institution building also forms part of an operation’s protection strategy, as institutions capable
                of protecting their own citizens are part of establishing a protective environment. Sustainable
                institution building requires resources (both financial and human) but also time.
              </li>
              <li class="about-getpos" data-nav-id="13">
                <b>Reforming/developing the security sector:</b>
                Ultimately, sustainable peace requires a security
                sector that is effective and is based on the rule of law. The security sector not only comprises
                uniformed personnel, but multiple structures and institutions that are responsible for their
                recruitment, management and oversight. And yet security-sector reform (SSR) goes beyond
                institutional development to also assist in the formulation of national security strategies and
                other policy and planning documents, as well as in fostering effective cooperative structures
                across   the   sector.   SSR   often   takes   a   comprehensive   approach,   also   engaging   with
                parliamentary oversight committees, civil society, and, at times, informal or non-state security
                providers.
              </li>
              <li class="about-getpos" data-nav-id="14">
                <b>Promoting the rule of law:</b>
                One element of promoting the rule of law addresses local
                institutions in the areas of justice, police, and corrections. But it also entails supporting the
                development, adoption and promulgation of legislation as well as in some cases drafting
                constitutions. For the population, access to justice is the fundamental concern and is often
                linked to the extension of state authority. A number of rule of law issues fuel conflict, such as
                disputed property and land rights or crime related to natural resources.
              </li>
              <li class="about-getpos" data-nav-id="15">
                <b>Supporting community policing:</b>
                Strengthening the relationship between host-state police
                and the communities they serve is central to fostering a protective environment that can ensure
                public safety in the long run. In addition to longer-term capacity and institution building
                support, community policing seeks involvement of communities in discussions on priorities
                and making policing more responsive to the needs of the community by, for example,
                establishing police-public bodies, such as public safety councils, to promote community
                safety. Policing approaches and operational priorities that are developed with the community
                are likely to serve the public safety needs of the local population better and, in turn, foster
                communities’ trust in police services.
              </li>
              <li class="about-getpos" data-nav-id="16">
                <b>Supporting transitional justice:</b>
                Both judicial and non-judicial mechanisms are used to
                address grievances, human rights violations, abuses, and mass atrocities committed during a
                conflict, with the aim of ending impunity and dealing with associated trauma. Transitional
                justice mechanisms are used when established judicial mechanisms are lacking in either
                capacity, knowledge or ability, or when they become necessary for reconciliation and for
                safeguarding   a   perception   of   independence   and   impartiality.   Typical   mechanisms   of
                transitional justice include truth commissions, criminal prosecutions in national courts or e.g.
                the International Court of Justice, institutional development, mediation, support for dialogue
                or programmes of reparations.
              </li>
            </ul>
          </div>
          <div v-if="selectedOperation === 'unmiss'" class="about-content">
            <h1>UNMISS and its effects</h1>
            <p class="about-intro-text">
              The EPON report (2/2019, <a href="https://effectivepeaceops.net/" target="_blank">https://effectivepeaceops.net/</a>) assesses the extent to which the UN Mission in South Sudan (UNMISS) is achieving its current strategic objectives and what impact the Mission has had on the political and security situation in South Sudan. As a large, multidimensional peacekeeping operation – with 17,000 troops, 2,000 police and 2,000 civilians – UNMISS has been provided with significant resources and an extraordinarily ambitious mandate. Examining the four key mandate areas—protection of civilians, facilitation of humanitarian delivery, human rights, and the political process—this report finds clear evidence of the significant impact of the mission on the everyday lives of South Sudanese citizens, but also many of the ways in which the effectiveness of the mission has been limited. It explores some of the key dilemmas facing UNMISS today as the UN struggles to protect against immediate risks while also helping to put in place the conditions for long-term peace.
            </p>
            <ul>
              <li class="about-getpos" data-nav-id="1">
                <strong>Preventing conflict:</strong>
                UNMISS is mandated to implement an early warning strategy, which includes information-gathering, monitoring, verification, and response mechanisms to PoC threats and human rights violations. While views on the effectiveness of the early warning system varied across the Mission, there was a general consensus that the Field Integrated Operations Centre structures were appropriate for the task of early warning and a good example of decentralised authority. The use of mixed patrols, where members of human rights, civil affairs, protection and other civilian components accompany patrols to potential hotspots, was cited as a positive practice that has allowed the Mission to identify emerging threats in a more holistic manner than in previous years.
              </li>
              <li class="about-getpos" data-nav-id="2">
                <strong>Building confidence:</strong>
                UNMISS played a critical role in facilitating a series of commander-level meetings on the ground. These events create the opportunity to demonstrate a commitment to the peace agreement, engage with local populations, and ultimately build confidence to overcome deep mutual mistrust. Confidence-building measures between the parties have freed up the movement of people in many areas, and the 31 October peace celebration was viewed as a strong sign of commitment by the respective sides.
              </li>
              <li class="about-getpos" data-nav-id="3">
                <strong>Stabilisation and extension of state authority:</strong>
                UNMISS is faced with the dilemma of having to balance stabilisation with the recognition that the Government is seen by large portions of the population as a party to the conflict and a continuing protection threat. As a result, the Mission has to find ways to support the country without legitimising a government that has perpetrated widespread abuses. UNMISS’ establishment of temporary bases in Leer and Yei have had multiple positive impacts: the continuous presence of the force appears to have diminished the active conflict in the immediate vicinity of the towns, while also creating a more protective atmosphere for civilians and increasing the capacity of humanitarians to work in the town.
              </li>
              <li class="about-getpos" data-nav-id="4">
                <strong>Protecting civilians (including preventing CRSV and SGBV):</strong>
                By offering refuge for those fleeing massive and widespread violence in 2013 and 2014, UNMISS provided immediate physical protection for more than 200,000 people, including large numbers of women and children. The majority have remained in what have become known as the “PoC [Protection of Civilians] sites” through 2018. Interlocutors across the country pointed to these PoC sites as unmistakable evidence of direct impact by protecting lives under imminent threat. With a mandate to protect civilians “within its capacity and areas of deployment,” but also to deter violence outside of the PoC site and foster an environment conducive to returns, UNMISS is faced with a dilemma. It can either continue to focus its assets on the PoC sites, where the impact is more readily measured, or work to extend the force and police presence to serve the broader vulnerable population, where direct impact is harder to achieve and measure.
              </li>
              <li class="about-getpos" data-nav-id="5">
                <strong>Strengthening public safety:</strong>
                A range of stakeholders were also concerned about protection within the PoC sites, given reports of high crime rates, up-ward trends of sexual violence, potential arms entering the sites, and overall politicisation of the sites. There was, however, a recognition among residents that the presence of UNMISS police within the sites – in line with their mandated task to provide public safety – was having a positive effect, limiting criminality, and mitigating protection risks.
              </li>
              <li class="about-getpos" data-nav-id="6">
                <strong>Promoting human rights:</strong>
                There was general agreement by interlocutors that over the last two years there has been increased visibility of UNMISS’ human rights reporting. The commitment to investigating and reporting publicly on rights violations may be contributing to improving the human rights situation indirectly, influencing decision-making by major stakeholders including in New York, and, more directly, moderating the behaviour of parties to the conflict. While Mission leadership argues that the reports offer useful “entry points” for discussions with South Sudanese leadership, most South Sudanese saw little impact of the reports when it came to deterring or influencing the behaviour of actors on the ground.
              </li>
              <li class="about-getpos" data-nav-id="7">
                <strong>Contributing to peace dividends:</strong>
                The harsh reality is that the populations in the peripheries of South Sudan are extremely unlikely to see many tangible benefits of the peace process in the short-term. At the same time, there are huge expectations among many South Sudanese communities that the UN will play a central role in bettering their lives and providing protections if the peace process again collapses. UNMISS continues to play a clear and important role in facilitating humanitarian delivery by providing protection to humanitarian convoys and/or flights into inaccessible parts of the country. The Mission’s perimeter security, internal coordination, provision of public order, and other activities are crucial enablers for large-scale delivery to some of the most vulnerable people in South Sudan.
              </li>
              <li class="about-getpos" data-nav-id="8">
                <strong>Supporting institution building and development:</strong>
                Since a more comprehensive mandate for institution building was scrapped in 2014, engagement in this area has been limited. However, UNMISS has developed dozens of standard operating procedures and guidance to address the many unique challenges of the PoC sites, creating over the past five years a form of lex loci within the sites that reflects an innovative and dynamic approach to producing guidance at the Mission level, and one that may well offer future UN operations a useful resource.
              </li>
              <li class="about-getpos" data-nav-id="9">
                <strong>Promoting the rule of law:</strong>
                Work to strengthen the rule of law capacities – not just State institutions, but also other authorities that have a role in resolving conflicts and addressing impunity – was described as a lynchpin in securing durable peace, but one where the current mandate of the Mission offers few clear opportunities and extremely limited resources. Though the 2014 shift in UNMISS’ mandate nearly eliminated capacity building, the Mission retains a small Rule of
                Law Advisory Section that remains largely focused on helping national actors build anti-impunity, human rights, and due process capacities.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pageTransition from '@/mixins/pageTransition'

export default {
  mixins: [pageTransition],

  computed: {
    ...mapGetters([
      'selectedOperation'
    ])
  }
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
        }
      }


    }

  }


}
</style>
