{{> cards/card_component componentName='help-article-with-menu' }}

class helpArticleWithMenuCardComponent extends BaseCard['help-article-with-menu'] {
  constructor(config = {}, systemConfig = {}) {
    super(config, systemConfig);
  }

  /**
   * This returns an object that will be called `card`
   * in the template. Put all mapping logic here.
   *
   * @param profile profile of the entity in the card
   */
  dataForRender(profile) {
    const linkTarget = AnswersExperience.runtimeConfig.get('linkTarget') || '_top';

    let detailsData = '';
    if (profile?.d_highlightedFields?.s_snippet) {
      const { value, matchedSubstrings } = profile.d_highlightedFields.s_snippet;
      detailsData = Formatter.highlightField(value, matchedSubstrings);
    } else if (profile.s_snippet) {
      detailsData = profile.s_snippet;
    }

    return {
      title: profile.name, // The header text of the card
      url: profile.website || profile.landingPageUrl, // If the card title is a clickable link, set URL here
      target: linkTarget, // If the title's URL should open in a new tab, etc.
      // image: '', // The URL of the image to display on the card
      // altText: '', // The alternate text for the image
      titleEventOptions: this.addDefaultEventOptions(),
      subtitle: profile.externalArticleUpdateDate ? `Last Updated on ${profile.externalArticleUpdateDate}` : '', // The sub-header text of the card
      details: detailsData, // The text in the body of the card
      menuCopyUrl: profile.website || profile.landingPageUrl,
      menuCopyText: "`" + detailsData + "`",
      // The primary CTA of the card
      CTA1: {
        label: "Read More", // The CTA's label
        iconName: 'chevron', // The icon to use for the CTA
        url: profile.website || profile.landingPageUrl, // The URL a user will be directed to when clicking
        target: linkTarget, // Where the new URL will be opened
        eventType: 'CTA_CLICK', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      },
      // The secondary CTA of the card
      CTA2: {
        label: profile.c_secondaryCTA ? profile.c_secondaryCTA.label : null,
        iconName: 'chevron',
        url: Formatter.generateCTAFieldTypeLink(profile.c_secondaryCTA),
        target: linkTarget,
        eventType: 'CTA_CLICK',
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '',
      }
    };
  }

  /**
   * The template to render
   * @returns {string}
   * @override
   */
  static defaultTemplateName (config) {
    return 'cards/helpoverride';
  }
}

ANSWERS.registerTemplate(
  'cards/helpoverride',
  {{{stringifyPartial (read 'cards/help-article-with-menu/template') }}}
);
ANSWERS.registerComponentType(helpArticleWithMenuCardComponent);