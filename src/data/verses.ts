export interface Verse {
  zh: string;
  en: string;
  refZh: string;
  refEn: string;
}

const verses: Verse[] = [
  { zh: "你的話是我腳前的燈，是我路上的光。", en: "Your word is a lamp for my feet, a light on my path.", refZh: "詩篇 119:105", refEn: "Psalm 119:105" },
  { zh: "耶和華是我的牧者，我必不致缺乏。", en: "The Lord is my shepherd, I lack nothing.", refZh: "詩篇 23:1", refEn: "Psalm 23:1" },
  { zh: "我靠著那加給我力量的，凡事都能做。", en: "I can do all this through him who gives me strength.", refZh: "腓立比書 4:13", refEn: "Philippians 4:13" },
  { zh: "應當一無掛慮，只要凡事藉著禱告、祈求和感謝，將你們所要的告訴神。", en: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", refZh: "腓立比書 4:6", refEn: "Philippians 4:6" },
  { zh: "你要專心仰賴耶和華，不可倚靠自己的聰明。", en: "Trust in the Lord with all your heart and lean not on your own understanding.", refZh: "箴言 3:5", refEn: "Proverbs 3:5" },
  { zh: "神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不致滅亡，反得永生。", en: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", refZh: "約翰福音 3:16", refEn: "John 3:16" },
  { zh: "我將這些事告訴你們，是要叫你們在我裡面有平安。", en: "I have told you these things, so that in me you may have peace.", refZh: "約翰福音 16:33", refEn: "John 16:33" },
  { zh: "你們要將一切的憂慮卸給神，因為他顧念你們。", en: "Cast all your anxiety on him because he cares for you.", refZh: "彼得前書 5:7", refEn: "1 Peter 5:7" },
  { zh: "耶和華是我的力量，是我的盾牌；我心裡倚靠他就得幫助。", en: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.", refZh: "詩篇 28:7", refEn: "Psalm 28:7" },
  { zh: "萬事都互相效力，叫愛神的人得益處。", en: "And we know that in all things God works for the good of those who love him.", refZh: "羅馬書 8:28", refEn: "Romans 8:28" },
  { zh: "因為耶和華賜人智慧；知識和聰明都由他口而出。", en: "For the Lord gives wisdom; from his mouth come knowledge and understanding.", refZh: "箴言 2:6", refEn: "Proverbs 2:6" },
  { zh: "但那等候耶和華的必重新得力。他們必如鷹展翅上騰。", en: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", refZh: "以賽亞書 40:31", refEn: "Isaiah 40:31" },
  { zh: "喜樂的心乃是良藥；憂傷的靈使骨枯乾。", en: "A cheerful heart is good medicine, but a crushed spirit dries up the bones.", refZh: "箴言 17:22", refEn: "Proverbs 17:22" },
  { zh: "我留下平安給你們；我將我的平安賜給你們。", en: "Peace I leave with you; my peace I give you.", refZh: "約翰福音 14:27", refEn: "John 14:27" },
  { zh: "你們祈求，就給你們；尋找，就尋見；叩門，就給你們開門。", en: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.", refZh: "馬太福音 7:7", refEn: "Matthew 7:7" },
  { zh: "不要懼怕，因為我與你同在；不要驚惶，因為我是你的神。", en: "So do not fear, for I am with you; do not be dismayed, for I am your God.", refZh: "以賽亞書 41:10", refEn: "Isaiah 41:10" },
  { zh: "愛是恆久忍耐，又有恩慈；愛是不嫉妒；愛是不自誇，不張狂。", en: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", refZh: "哥林多前書 13:4", refEn: "1 Corinthians 13:4" },
  { zh: "你們要嘗嘗主恩的滋味，便知道他是美善。", en: "Taste and see that the Lord is good; blessed is the one who takes refuge in him.", refZh: "詩篇 34:8", refEn: "Psalm 34:8" },
  { zh: "若有人在基督裡，他就是新造的人，舊事已過，都變成新的了。", en: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!", refZh: "哥林多後書 5:17", refEn: "2 Corinthians 5:17" },
  { zh: "耶和華必在你前面行；他必與你同在。", en: "The Lord himself goes before you and will be with you.", refZh: "申命記 31:8", refEn: "Deuteronomy 31:8" },
  { zh: "凡勞苦擔重擔的人可以到我這裡來，我就使你們得安息。", en: "Come to me, all you who are weary and burdened, and I will give you rest.", refZh: "馬太福音 11:28", refEn: "Matthew 11:28" },
  { zh: "我的恩典夠你用的，因為我的能力是在人的軟弱上顯得完全。", en: "My grace is sufficient for you, for my power is made perfect in weakness.", refZh: "哥林多後書 12:9", refEn: "2 Corinthians 12:9" },
  { zh: "我要向山舉目；我的幫助從何而來？我的幫助從造天地的耶和華而來。", en: "I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth.", refZh: "詩篇 121:1-2", refEn: "Psalm 121:1-2" },
  { zh: "你們要休息，要知道我是神。", en: "Be still, and know that I am God.", refZh: "詩篇 46:10", refEn: "Psalm 46:10" },
  { zh: "所以，不要為明天憂慮，因為明天自有明天的憂慮。", en: "Therefore do not worry about tomorrow, for tomorrow will worry about itself.", refZh: "馬太福音 6:34", refEn: "Matthew 6:34" },
  { zh: "他使我躺臥在青草地上，領我在可安歇的水邊。", en: "He makes me lie down in green pastures, he leads me beside quiet waters.", refZh: "詩篇 23:2", refEn: "Psalm 23:2" },
  { zh: "在人這是不能的，在神凡事都能。", en: "With man this is impossible, but with God all things are possible.", refZh: "馬太福音 19:26", refEn: "Matthew 19:26" },
  { zh: "你們是世上的光。城造在山上是不能隱藏的。", en: "You are the light of the world. A town built on a hill cannot be hidden.", refZh: "馬太福音 5:14", refEn: "Matthew 5:14" },
  { zh: "你的信救了你；平平安安地去吧！", en: "Your faith has saved you; go in peace.", refZh: "路加福音 7:50", refEn: "Luke 7:50" },
  { zh: "耶和華善待萬民；他的慈悲覆庇他一切所造的。", en: "The Lord is good to all; he has compassion on all he has made.", refZh: "詩篇 145:9", refEn: "Psalm 145:9" },
  { zh: "我已經與基督同釘十字架，現在活著的不再是我，乃是基督在我裡面活著。", en: "I have been crucified with Christ and I no longer live, but Christ lives in me.", refZh: "加拉太書 2:20", refEn: "Galatians 2:20" },
  { zh: "看哪，我站在門外叩門，若有聽見我聲音就開門的，我要進到他那裡去。", en: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in.", refZh: "啟示錄 3:20", refEn: "Revelation 3:20" },
  { zh: "從日出之地到日落之處，耶和華的名是應當讚美的。", en: "From the rising of the sun to the place where it sets, the name of the Lord is to be praised.", refZh: "詩篇 113:3", refEn: "Psalm 113:3" },
  { zh: "耶和華靠近傷心的人，拯救靈性痛悔的人。", en: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", refZh: "詩篇 34:18", refEn: "Psalm 34:18" },
  { zh: "因我們行事為人是憑著信心，不是憑著眼見。", en: "For we live by faith, not by sight.", refZh: "哥林多後書 5:7", refEn: "2 Corinthians 5:7" },
  { zh: "神是我們的避難所，是我們的力量，是我們在患難中隨時的幫助。", en: "God is our refuge and strength, an ever-present help in trouble.", refZh: "詩篇 46:1", refEn: "Psalm 46:1" },
];

/**
 * Returns a deterministic verse for the given date.
 * Same date always returns the same verse.
 */
export function getDailyVerse(date: Date = new Date()): Verse {
  const daysSinceEpoch = Math.floor(date.getTime() / 86400000);
  return verses[daysSinceEpoch % verses.length];
}

export default verses;
