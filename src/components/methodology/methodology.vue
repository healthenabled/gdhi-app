<template>

  <div class="content-centered">
    <div class="methodology">
      <div class="methodology-title page-title">Methodology</div>
      <div class="content">
        <p class="header-bold"> Our Approach </p>
        <p>Based on the framework set in the World Health Organization – International Telecommunication Union’s 2012
        National eHealth Strategy Toolkit, the GDHI team conducted rigorous research and engaged digital health
        experts from over 20 countries to develop a recommended set of indicators that help countries track, monitor,
        assess, and benchmark the effective use of digital health.</p>
        <br>
        <p class="sub-header">To develop the indicators, the GDHI team:</p>
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
        <p> The GDHI team works with country partners and Ministry of Health representatives who are
        leading digital health efforts in their respective countries to collect data for each country.
        These country partners submit their country’s data through an annual GDHI survey,
        and select the appropriate phase for each indicator as well as rationale and evidence to support these phases.
        The GDHI team verifies the collected data before publishing it. Broader Health Data from the 
          <a 
            href="http://wdi.worldbank.org/tables" 
            target="_blank" 
            class="link-blue">
            World Bank Development Indicators 2016
          </a> has been included to contextualize digital health maturity.
        </p>

        <p class="header-bold">Calculating Averages and Benchmarking</p>
        <p> The GDHI uses the main indicators in each category to calculate the overall country average.
        While sub-indicators are included to add greater specificity to specific GDHI indicators,
        they are not used in calculating the Component Phase or the Country or Global Averages.
        The GDHI enables countries to benchmark themselves against the Global Average or a specific overall phase.</p>
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
