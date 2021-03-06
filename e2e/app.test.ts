import {by, device, element, expect} from 'detox';
import {defineFeature, DefineStepFunction, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./app.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  const iPressDrawButton = (step: DefineStepFunction) => {
    step('I press "Draw Button"', async () => {
      await element(by.id('HomeScreen.DrawButton')).tap();
    });
  };

  const iPressActionCardTypeButton = (step: DefineStepFunction) => {
    step(
      /^I press "(.*) (.*) Card Button"$/,
      async (action: string, cardType: string) => {
        await element(by.id('HomeScreen.CharacterSelectionButton')).tap();
        await expect(element(by.id('CharacterSelectionScreen'))).toBeVisible();
        await element(by.id('SpellweaverButton')).tap();
        await expect(element(by.id('HomeScreen'))).toBeVisible();
        await element(by.id(`HomeScreen.${action}${cardType}Button`)).tap();
      },
    );
  };

  test('Data is loaded', ({given, when, then}) => {
    given('I am any', async () => {
      await element(by.id('AnalyticsConsentScreen.DisagreeButton')).tap();
    });

    when('I am at "Home Screen"', async () => {});

    then('I should see "Spellweaver"', async () => {
      await expect(
        element(by.text('Spellweaver').withAncestor(by.id('HomeScreen'))),
      ).toBeVisible();
    });

    then('I should see "Draw Button"', async () => {
      await expect(element(by.id('HomeScreen.DrawButton'))).toBeVisible();
    });

    then('I should see "Draw Deck Count"', async () => {
      await expect(element(by.text('DRAW (20)'))).toBeVisible();
    });
  });

  test('Draw card', ({given, when, then}) => {
    given('I am at "Home Screen"', () => {});

    iPressDrawButton(when);

    then('I should see "Drawn Card"', async () => {});

    then('I should see "Draw Deck Count Decrease By 1"', async () => {
      await expect(element(by.text('DRAW (19)'))).toBeVisible();
    });
  });

  test('Shuffle discard into draw', ({given, when, then}) => {
    given('I am at "Home Screen"', () => {});

    iPressDrawButton(given);

    when('I press "Shuffle Button"', async () => {
      await element(by.id('HomeScreen.ShuffleButton')).tap();
    });

    then('I should see "No Drawn Card"', async () => {});

    then('I should see "Draw Deck Count back to original"', async () => {
      await expect(element(by.text('DRAW (20)'))).toBeVisible();
    });
  });

  test('Add bless/curse/equipment card into draw', ({given, when, then}) => {
    given('I am at "Home Screen"', () => {});

    iPressActionCardTypeButton(when);

    then('I should see "Draw Deck Count Increase by 1"', async () => {
      await expect(element(by.text('DRAW (21)'))).toBeVisible();
    });
  });

  test('Remove bless/curse/equipment card from draw', ({given, when, then}) => {
    given('I am at "Home Screen"', () => {});

    iPressActionCardTypeButton(given);

    iPressActionCardTypeButton(when);

    iPressActionCardTypeButton(when);

    then('I should see "Draw Deck Count back to original"', async () => {
      await expect(element(by.text('DRAW (20)'))).toBeVisible();
    });
  });

  test('Update perks', ({given, when, then}) => {
    given('I am at "Home Screen"', () => {});

    when('I press "Update Perk Button"', async () => {
      await element(by.id('HomeScreen.UpdatePerkButton')).tap();
    });

    then('I should see "Perks Screen"', async () => {
      await expect(element(by.id('PerkUpdateScreen'))).toBeVisible();
    });
  });

  test('Diviner Effect', ({given, when, then}) => {
    given('I am at "Home Screen"', () => {});

    iPressDrawButton(given);

    when('I press "Toggle Diviner Effect Button"', async () => {
      await element(by.id('HomeScreen.DivinerEffectButton')).tap();
    });

    then('I should see "Diviner Effect Buttons"', async () => {
      await expect(element(by.id('Card.TopButton'))).toBeVisible();
      await expect(element(by.id('Card.BottomButton'))).toBeVisible();
    });

    when('I press "Top Button"', async () => {
      await element(by.id('Card.TopButton')).tap();
    });

    then('I should see "Draw Deck Count 20"', async () => {
      await expect(element(by.text('DRAW (20)'))).toBeVisible();
    });

    iPressDrawButton(when);

    when('I press "Bottom Button"', async () => {
      await element(by.id('Card.BottomButton')).tap();
    });

    then('I should see "Draw Deck Count 20"', async () => {
      await expect(element(by.text('DRAW (20)'))).toBeVisible();
    });
  });

  test('Non-equipment -1', ({given, when, then}) => {
    given('I am at "Home Screen"', () => {});

    when('I press "Remove Non-equipment -1 Button"', async () => {
      await element(by.id('HomeScreen.RemoveMinusOneButton')).tap();
    });

    then('I should see "Draw Deck Count 19"', async () => {
      await expect(element(by.text('DRAW (19)'))).toBeVisible();
    });

    when('I press "Add Non-equipment -1 Button"', async () => {
      await element(by.id('HomeScreen.AddMinusOneButton')).tap();
    });

    then('I should see "Draw Deck Count 20"', async () => {
      await expect(element(by.text('DRAW (20)'))).toBeVisible();
    });

    when('I press "Add Non-equipment -1 Button"', async () => {
      await element(by.id('HomeScreen.AddMinusOneButton')).tap();
    });

    then('I should see "Draw Deck Count 20"', async () => {
      await expect(element(by.text('DRAW (20)'))).toBeVisible();
    });
  });
});
