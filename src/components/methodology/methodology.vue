<template>

  <div class="content-centered">
    <div class="methodology">
      <div class="methodology-title page-title">Methodology</div>
      <div class="content">
        <p class="header-bold"> Our Approach </p>
        <p>Based on the framework set in the World Health Organization – International Telecommunication Union’s 2012
        National eHealth Strategy Toolkit, the GDHI team conducted rigorous research and engaged digital health experts
        from over 20 countries to develop a recommended set of 19 indicators that help countries track, monitor, assess,
        and benchmark the effective use of digital health.</p>
        <br>
        <p class="sub-header">To develop the 19 indicators, the GDHI team:</p>
        <ul class="list-with-bullets">
          <li>
            Conducted a landscape review of global data available through multilateral organizations.
          </li>
          <li>
            Mapped available data by reviewing existing frameworks and tools developed by experts to help practitioners
            and countries assess the strength and maturity of the enabling environment relevant to digital health.
          </li>
          <li>
            Convened digital health experts to develop use cases for GDHI and refine and define an initial set
            of recommended indicators into a user-friendly and manageable list.
          </li>
        </ul>
        <p>List of GDHI Indicators.
          <a
            href="/indicators_info"
            class="link link-blue">See here</a>
        </p>
        <p class="header-bold">Data Collection and Verification</p>
        <p> We work with country partners who are leading digital health efforts in their respective countries to collect
        data for each country. These country partners submit their country’s data through an annual GDHI questionnaire,
        and provide scores for each indicator as well as rationale and evidence to support these scores.
        The GDHI team verifies the collected data before publishing it.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '../../common/common'

  export default {
    name: 'Methodology',
    mounted() {
      common.hideLoading();
    }
  };
</script>
