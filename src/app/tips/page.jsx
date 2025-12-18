"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
import { IoRestaurantOutline } from "react-icons/io5";
import {
  FaClock,
  FaLeaf,
  FaFire,
  FaBook,
  FaTemperatureHigh,
  FaLemon,
} from "react-icons/fa6";
import { FaUserTie, FaCut } from "react-icons/fa";
import { GiMeat, GiTongue } from "react-icons/gi";

export default function Tips() {
  useEffect(() => {
    document.title = "Kitchen Tips & Techniques - Culinary Delights";
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <IoRestaurantOutline className={styles.chefIcon} />
        <h1 className={styles.title}>Kitchen Tips & Techniques</h1>
        <p className={styles.subtitle}>
          Master the art of cooking with expert tips, techniques and
          <br />
          kitchen wisdom that will elevate your culinary skills.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <h3>Knife Skills</h3>
            <p>
              Keep knives sharp for safer cutting. Use the &quot;claw grip&quot;
              with your non-cutting hand to protect fingers. Practice the
              rocking motion for consistent cuts.
            </p>
            <ul className={styles.tipList}>
              <li>Always cut on a stable cutting board</li>
              <li>Keep knife blades pointed away from your body</li>
              <li>
                Use proper knife for each task (paring, chef&apos;s, serrated)
              </li>
            </ul>
          </div>
          <div className={styles.tipCard}>
            <h3>Seasoning</h3>
            <p>
              Season in layers throughout cooking, not just at the end. Taste
              frequently and adjust. Salt enhances other flavors.
            </p>
            <ul className={styles.tipList}>
              <li>Season meat 40 minutes before cooking</li>
              <li>Add acid (lemon, vinegar) at the end</li>
              <li>Use fresh herbs for finishing, dried for cooking</li>
            </ul>
          </div>
          <div className={styles.tipCard}>
            <h3>Heat Control</h3>
            <p>
              High heat for searing, medium for pan frying, low for simmering.
              Let pans preheat before adding food.
            </p>
            <ul className={styles.tipList}>
              <li>Use a meat thermometer for accuracy</li>
              <li>Let meat rest after cooking to redistribute juices</li>
              <li>Don&apos;t overcrowd pans - it steams instead of browns</li>
            </ul>
          </div>
          <div className={styles.tipCard}>
            <h3>Kitchen Organization</h3>
            <p>
              Prepare all ingredients before cooking (everything in its place).
              Keep workspace clean and organized for efficiency.
            </p>
            <ul className={styles.tipList}>
              <li>Read the entire recipe before starting</li>
              <li>Measure and prep all ingredients first</li>
              <li>Clean as you go to avoid overwhelming mess</li>
            </ul>
          </div>
          <div className={styles.tipCard}>
            <h3>Food Safety</h3>
            <p>
              Wash hands frequently, separate raw and cooked foods, and store at
              proper temperatures to prevent illness.
            </p>
            <ul className={styles.tipList}>
              <li>Keep cold foods under 40°F (4°C)</li>
              <li>Cook poultry to 165°F (74°C) internal temperature</li>
              <li>Don&apos;t leave perishables out for more than 2 hours</li>
            </ul>
          </div>
          <div className={styles.tipCard}>
            <h3>Ingredient Selection</h3>
            <p>
              Choose fresh, seasonal ingredients when possible. Know how to
              identify quality produce and proteins.
            </p>
            <ul className={styles.tipList}>
              <li>
                Smell fish - it should smell like the ocean, not
                &quot;fishy&quot;
              </li>
              <li>Press produce gently - it should have slight give</li>
              <li>Check expiration dates and buy from reputable sources</li>
            </ul>
          </div>
        </div>

        <div className={styles.extraSection}>
          <h2 className={styles.sectionTitle}>Essential Cooking Techniques</h2>
          <div className={styles.techniquesGrid}>
            <div className={styles.techniqueCard}>
              <h4>Pan Frying</h4>
              <p>
                Quick cooking in a small amount of fat over high heat. Keep food
                moving for even cooking.
              </p>
            </div>
            <div className={styles.techniqueCard}>
              <h4>Braising</h4>
              <p>
                Slow cooking in liquid. Brown first, then add liquid and cook
                covered at low temperature.
              </p>
            </div>
            <div className={styles.techniqueCard}>
              <h4>Roasting</h4>
              <p>
                Dry heat cooking in the oven. Perfect for vegetables, meats, and
                developing deep flavors.
              </p>
            </div>
            <div className={styles.techniqueCard}>
              <h4>Blanching</h4>
              <p>
                Brief boiling followed by ice bath. Preserves color and texture,
                perfect for vegetables.
              </p>
            </div>
            <div className={styles.techniqueCard}>
              <h4>Grilling</h4>
              <p>
                High heat cooking over direct flame or coals. Creates
                distinctive char marks and smoky flavors.
              </p>
            </div>
            <div className={styles.techniqueCard}>
              <h4>Steaming</h4>
              <p>
                Gentle cooking with steam heat. Retains nutrients and natural
                flavors without added fats.
              </p>
            </div>
            <div className={styles.techniqueCard}>
              <h4>Poaching</h4>
              <p>
                Gentle simmering in flavored liquid. Perfect for delicate items
                like eggs and fish.
              </p>
            </div>
            <div className={styles.techniqueCard}>
              <h4>Stir Frying</h4>
              <p>
                Fast cooking over very high heat with constant stirring. Keeps
                vegetables crisp and colorful.
              </p>
            </div>
            <div className={styles.techniqueCard}>
              <h4>Baking</h4>
              <p>
                Dry heat cooking in enclosed oven. Essential for breads,
                pastries, and casseroles.
              </p>
            </div>
            <div className={styles.techniqueCard}>
              <h4>Searing</h4>
              <p>
                High heat browning to create flavorful crust. Locks in juices
                and develops rich colors.
              </p>
            </div>
            <div className={styles.techniqueCard}>
              <h4>Slow Cooking</h4>
              <p>
                Long, low temperature cooking. Breaks down tough fibers for
                tender, flavorful results.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.kitchenEssentialsSection}>
          <h2 className={styles.sectionTitle}>Kitchen Essentials Guide</h2>
          <div className={styles.essentialsGrid}>
            <div className={styles.essentialCategory}>
              <h3>Must-Have Knives</h3>
              <ul className={styles.essentialList}>
                <li>8-10 inch chef&apos;s knife - your most important tool</li>
                <li>Paring knife for detail work</li>
                <li>Serrated bread knife</li>
                <li>Utility knife for medium tasks</li>
              </ul>
            </div>
            <div className={styles.essentialCategory}>
              <h3>Essential Cookware</h3>
              <ul className={styles.essentialList}>
                <li>Non-stick frying pan (10-12 inch)</li>
                <li>Cast iron skillet for searing</li>
                <li>Heavy-bottomed saucepan with lid</li>
                <li>Large stockpot for soups & pasta</li>
                <li>Baking sheet pans</li>
              </ul>
            </div>
            <div className={styles.essentialCategory}>
              <h3>Basic Tools</h3>
              <ul className={styles.essentialList}>
                <li>Wooden spoons & spatulas</li>
                <li>Tongs for turning food</li>
                <li>Whisk for mixing & emulsions</li>
                <li>Can opener & bottle opener</li>
                <li>Digital kitchen scale</li>
                <li>Instant-read thermometer</li>
              </ul>
            </div>
            <div className={styles.essentialCategory}>
              <h3>Pantry Staples</h3>
              <ul className={styles.essentialList}>
                <li>Extra virgin olive oil & neutral oil</li>
                <li>Sea salt & black pepper</li>
                <li>Garlic & onions</li>
                <li>Dried herbs: oregano, thyme, basil</li>
                <li>Vinegar: balsamic & apple cider</li>
                <li>Quality stock/broth</li>
              </ul>
            </div>
            <div className={styles.essentialCategory}>
              <h3>Storage & Organization</h3>
              <ul className={styles.essentialList}>
                <li>Glass food storage containers</li>
                <li>Airtight canisters for dry goods</li>
                <li>Cutting board (separate for meat & vegetables)</li>
                <li>Kitchen towels & paper towels</li>
                <li>Aluminum foil & plastic wrap</li>
                <li>Labels for dating leftovers</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.seasonalTipsSection}>
          <h2 className={styles.sectionTitle}>Seasonal Cooking Tips</h2>
          <div className={styles.seasonalGrid}>
            <div className={styles.seasonCard}>
              <h3>Spring</h3>
              <p>Focus on fresh, light flavors</p>
              <ul>
                <li>Use tender spring vegetables</li>
                <li>Incorporate fresh herbs</li>
                <li>Try lighter cooking methods</li>
                <li>Make use of citrus zest</li>
              </ul>
            </div>
            <div className={styles.seasonCard}>
              <h3>Summer</h3>
              <p>Embrace no-cook & grilling</p>
              <ul>
                <li>Grill outdoors when possible</li>
                <li>Make fresh salsas & salads</li>
                <li>Use peak-season fruits</li>
                <li>Keep cooking times short</li>
              </ul>
            </div>
            <div className={styles.seasonCard}>
              <h3>Fall</h3>
              <p>Warm, comforting dishes</p>
              <ul>
                <li>Roast root vegetables</li>
                <li>Use warming spices</li>
                <li>Make hearty stews & soups</li>
                <li>Preserve summer&apos;s bounty</li>
              </ul>
            </div>
            <div className={styles.seasonCard}>
              <h3>Winter</h3>
              <p>Rich, nourishing meals</p>
              <ul>
                <li>Slow-cook tough cuts</li>
                <li>Use dried beans & grains</li>
                <li>Make warming beverages</li>
                <li>Focus on citrus fruits</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.quickTipsSection}>
          <h2 className={styles.sectionTitle}>Quick Tips for Success</h2>
          <div className={styles.quickTips}>
            <div className={styles.quickTip}>
              <FaUserTie className={styles.tipIcon} /> Room temperature
              ingredients mix better than cold ones
            </div>
            <div className={styles.quickTip}>
              <GiTongue className={styles.tipIcon} /> Taste your food throughout
              the cooking process
            </div>
            <div className={styles.quickTip}>
              <FaCut className={styles.tipIcon} /> A sharp knife is safer than a
              dull one
            </div>
            <div className={styles.quickTip}>
              <GiMeat className={styles.tipIcon} /> Don&apos;t flip meat too
              early - let it develop a crust first
            </div>
            <div className={styles.quickTip}>
              <FaClock className={styles.tipIcon} /> Use a timer to avoid
              overcooking
            </div>
            <div className={styles.quickTip}>
              <FaLeaf className={styles.tipIcon} /> Fresh herbs should be added
              at the end of cooking
            </div>
            <div className={styles.quickTip}>
              <FaLeaf className={styles.tipIcon} /> Salt pasta water until it
              tastes like the sea
            </div>
            <div className={styles.quickTip}>
              <FaFire className={styles.tipIcon} /> Let your pan get hot before
              adding oil to prevent sticking
            </div>
            <div className={styles.quickTip}>
              <FaBook className={styles.tipIcon} /> Always read the entire
              recipe before you start cooking
            </div>
            <div className={styles.quickTip}>
              <FaTemperatureHigh className={styles.tipIcon} /> Use a wooden
              spoon to test oil temperature - it should bubble around the wood
            </div>
            <div className={styles.quickTip}>
              <FaLemon className={styles.tipIcon} /> Add a splash of acid
              (lemon, vinegar) to brighten flavors at the end
            </div>
            <div className={styles.quickTip}>
              <FaClock className={styles.tipIcon} /> Let meat rest for 5-10
              minutes after cooking to retain juices
            </div>
          </div>
        </div>

        <div>
          <h2 className={styles.sectionTitle}>
            Kitchen Measurements & Conversions
          </h2>
          <div className={styles.measurementsGrid}>
            <div className={styles.measurementCard}>
              <h4>Volume Conversions</h4>
              <ul className={styles.conversionList}>
                <li>1 cup = 240ml = 16 tablespoons</li>
                <li>1 tablespoon = 15ml = 3 teaspoons</li>
                <li>1 teaspoon = 5ml</li>
                <li>1 pint = 2 cups = 480ml</li>
                <li>1 quart = 4 cups = 960ml</li>
              </ul>
            </div>
            <div className={styles.measurementCard}>
              <h4>Weight Conversions</h4>
              <ul className={styles.conversionList}>
                <li>1 pound = 454 grams</li>
                <li>1 ounce = 28 grams</li>
                <li>1 kilogram = 2.2 pounds</li>
                <li>1 stick butter = 113g = 8 tbsp</li>
                <li>1 cup flour = 120-125g</li>
              </ul>
            </div>
            <div className={styles.measurementCard}>
              <h4>Temperature Guide</h4>
              <ul className={styles.conversionList}>
                <li>Water boils: 212°F / 100°C</li>
                <li>Water simmers: 185°F / 85°C</li>
                <li>Medium heat: 325-350°F / 160-175°C</li>
                <li>Hot oil: 350-375°F / 175-190°C</li>
                <li>Bread baking: 375-425°F / 190-220°C</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.ingredientSubsSection}>
          <h2 className={styles.sectionTitle}>Ingredient Substitutions</h2>
          <div className={styles.subsGrid}>
            <div className={styles.subsCard}>
              <h4>Baking Substitutions</h4>
              <div className={styles.substitution}>
                <strong>1 egg:</strong> 1/4 cup applesauce, 1/4 cup mashed
                banana, or 1 tbsp ground flaxseed + 3 tbsp water
              </div>
              <div className={styles.substitution}>
                <strong>1 cup butter:</strong> 1 cup coconut oil, 3/4 cup
                vegetable oil, or 1 cup applesauce
              </div>
              <div className={styles.substitution}>
                <strong>1 cup sugar:</strong> 3/4 cup honey (reduce liquid by
                1/4 cup), 1 cup maple syrup
              </div>
            </div>
            <div className={styles.subsCard}>
              <h4>Cooking Substitutions</h4>
              <div className={styles.substitution}>
                <strong>1 clove garlic:</strong> 1/8 tsp garlic powder, 1/4 tsp
                granulated garlic
              </div>
              <div className={styles.substitution}>
                <strong>1 tbsp fresh herbs:</strong> 1 tsp dried herbs
              </div>
              <div className={styles.substitution}>
                <strong>1 cup wine:</strong> 1 cup broth + 1 tbsp vinegar, or 1
                cup grape juice + 1 tbsp lemon juice
              </div>
            </div>
          </div>
        </div>

        <div className={styles.foodSafetySection}>
          <h2 className={styles.sectionTitle}>Food Safety Guidelines</h2>
          <div className={styles.safetyGrid}>
            <div className={styles.safetyCard}>
              <h4>Safe Internal Temperatures</h4>
              <div className={styles.tempGuide}>
                <div className={styles.tempItem}>
                  <span className={styles.tempFood}>
                    Poultry (chicken, turkey):
                  </span>
                  <span className={styles.tempValue}>165°F / 74°C</span>
                </div>
                <div className={styles.tempItem}>
                  <span className={styles.tempFood}>Ground meat:</span>
                  <span className={styles.tempValue}>160°F / 71°C</span>
                </div>
                <div className={styles.tempItem}>
                  <span className={styles.tempFood}>Pork, beef steaks:</span>
                  <span className={styles.tempValue}>145°F / 63°C</span>
                </div>
                <div className={styles.tempItem}>
                  <span className={styles.tempFood}>Fish:</span>
                  <span className={styles.tempValue}>145°F / 63°C</span>
                </div>
                <div className={styles.tempItem}>
                  <span className={styles.tempFood}>Eggs:</span>
                  <span className={styles.tempValue}>160°F / 71°C</span>
                </div>
              </div>
            </div>
            <div className={styles.safetyCard}>
              <h4>Storage Guidelines</h4>
              <div className={styles.storageGuide}>
                <div className={styles.storageItem}>
                  <strong>Refrigerator (40°F/4°C or below):</strong>
                  <ul>
                    <li>Raw meat: 1-2 days</li>
                    <li>Cooked leftovers: 3-4 days</li>
                    <li>Fresh fish: 1-2 days</li>
                    <li>Eggs: 3-5 weeks</li>
                  </ul>
                </div>
                <div className={styles.storageItem}>
                  <strong>Freezer (0°F/-18°C):</strong>
                  <ul>
                    <li>Ground meat: 3-4 months</li>
                    <li>Steaks, chops: 4-12 months</li>
                    <li>Cooked dishes: 2-3 months</li>
                    <li>Bread: 3 months</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.seasoningGuideSection}>
          <h2 className={styles.sectionTitle}>Flavor Pairing Guide</h2>
          <div className={styles.pairingGrid}>
            <div className={styles.pairingCard}>
              <h4>Classic Herb Combinations</h4>
              <ul className={styles.pairingList}>
                <li>
                  <strong>Italian:</strong> Basil, oregano, thyme, rosemary
                </li>
                <li>
                  <strong>French:</strong> Tarragon, chervil, parsley, chives
                </li>
                <li>
                  <strong>Mediterranean:</strong> Oregano, mint, dill, parsley
                </li>
                <li>
                  <strong>Mexican:</strong> Cilantro, cumin, chili powder, lime
                </li>
              </ul>
            </div>
            <div className={styles.pairingCard}>
              <h4>Protein Seasonings</h4>
              <ul className={styles.pairingList}>
                <li>
                  <strong>Chicken:</strong> Thyme, sage, rosemary, lemon
                </li>
                <li>
                  <strong>Beef:</strong> Black pepper, garlic, onion, herbs
                </li>
                <li>
                  <strong>Pork:</strong> Sage, apple, fennel, garlic
                </li>
                <li>
                  <strong>Fish:</strong> Dill, lemon, capers, parsley
                </li>
              </ul>
            </div>
            <div className={styles.pairingCard}>
              <h4>Vegetable Pairings</h4>
              <ul className={styles.pairingList}>
                <li>
                  <strong>Tomatoes:</strong> Basil, oregano, garlic
                </li>
                <li>
                  <strong>Potatoes:</strong> Rosemary, thyme, chives
                </li>
                <li>
                  <strong>Carrots:</strong> Dill, parsley, honey
                </li>
                <li>
                  <strong>Mushrooms:</strong> Thyme, garlic, wine
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
