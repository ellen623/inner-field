import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// QUESTION BANKS
// ─────────────────────────────────────────────────────────────

const HSP = [
  {zh:"我容易被强烈的感官刺激所困扰，例如噪音、强光或气味。",en:"I am easily overwhelmed by strong sensory stimuli.",quote:{zh:"感受得更多，\n不是负担，是天赋。",en:"To feel more\nis not a burden—it is a gift.",author:"Elaine Aron"}},
  {zh:"当我周围有很多事情同时发生时，我会感到不安。",en:"I get rattled when I have a lot to do in a short time.",quote:{zh:"安静，是某些人\n思考的最高形式。",en:"Quiet is the highest form\nof thinking for some souls.",author:"Susan Cain"}},
  {zh:"我对痛苦非常敏感。",en:"I am particularly sensitive to the effects of pain.",quote:{zh:"我们愈是敏感，\n就愈能感受世界的美。",en:"The more sensitive we are,\nthe more beauty we perceive.",author:"Anaïs Nin"}},
  {zh:"在繁忙的日子里，我需要退到暗室或安静的地方恢复。",en:"On busy days I need to retreat to a dark or quiet place.",quote:{zh:"独处，是与自己\n最诚实的约会。",en:"Solitude is the most honest\ndate you can keep with yourself.",author:"Virginia Woolf"}},
  {zh:"我对艺术或音乐深感触动。",en:"I am deeply moved by the arts or music.",quote:{zh:"音乐能说出\n那些无法言说的，又无法沉默的。",en:"Music can say what cannot\nbe said and cannot be silent.",author:"Victor Hugo"}},
  {zh:"我的神经系统有时因为太多事情而感到不堪重负。",en:"My nervous system sometimes feels too frazzled to go on.",quote:{zh:"精疲力竭，\n有时是灵魂说得够了。",en:"Exhaustion is sometimes\nthe soul saying: enough.",author:"—"}},
  {zh:"我对细节非常谨慎，不轻易重复同样的错误。",en:"I am very careful to avoid making mistakes.",quote:{zh:"注意，是爱的\n最朴素的形式。",en:"Attention is the most\nbasic form of love.",author:"Simone Weil"}},
  {zh:"我讨厌同时做很多事。",en:"I don't enjoy doing many things at once.",quote:{zh:"深度，\n是对宽度的抵抗。",en:"Depth is the resistance\nto breadth.",author:"—"}},
  {zh:"当我必须在短时间内完成很多事时，我会很不舒服。",en:"I find it unpleasant when a lot is going on at once.",quote:{zh:"时间不够用，\n有时是因为你活得太认真。",en:"Never enough time sometimes\nmeans you live too earnestly.",author:"—"}},
  {zh:"当人们在我的环境中感到不舒服时，我会注意并知道该怎么办。",en:"I notice when others are uncomfortable around me.",quote:{zh:"感知他人，\n是一种无声的慈悲。",en:"Perceiving others\nis a silent form of compassion.",author:"—"}},
  {zh:"我很烦恼，当别人试图让我在短时间内做太多事情。",en:"I get annoyed when others try to get me to do too many things.",quote:{zh:"界限，是对自我的温柔守护。",en:"Boundaries are\na gentle protection of the self.",author:"—"}},
  {zh:"我对自己生活的安排非常重视，任何干扰都让我不安。",en:"I try hard to avoid making mistakes or forgetting things.",quote:{zh:"秩序，是某些人\n给自己造的庇护所。",en:"Order is the shelter\nsome people build for themselves.",author:"—"}},
  {zh:"我容易被咖啡因影响。",en:"I am easily affected by caffeine.",quote:{zh:"身体，\n是灵魂最诚实的日记。",en:"The body is the most honest\ndiary the soul keeps.",author:"—"}},
  {zh:"暴露在强光、气味或噪音中时，我会感到不舒服。",en:"Loud noises or strong smells easily overwhelm me.",quote:{zh:"有些人，\n是用皮肤呼吸世界的。",en:"Some people breathe\nthe world through their skin.",author:"—"}},
  {zh:"我有丰富而复杂的内心世界。",en:"I have a rich and complex inner life.",quote:{zh:"内心的宇宙，\n不比外部的宇宙更小。",en:"The inner universe\nis no smaller than the outer one.",author:"Blaise Pascal"}},
  {zh:"大声的噪音让我感到不舒服。",en:"Loud noises are particularly distressing to me.",quote:{zh:"沉默，\n是某些人的母语。",en:"Silence is the mother tongue\nof certain souls.",author:"—"}},
  {zh:"我能深刻感受到音乐。",en:"I am deeply moved when I hear beautiful music.",quote:{zh:"音乐开始的地方，\n语言就结束了。",en:"Where words end,\nmusic begins.",author:"Heinrich Heine"}},
  {zh:"经历很多事情之后，我需要安静的地方来恢复。",en:"After stimulation, I need to withdraw somewhere.",quote:{zh:"退潮，\n是为了下一次涌来。",en:"The tide withdraws\nonly to return.",author:"—"}},
  {zh:"我的良心非常发达，以至于有时会让我不安。",en:"My conscience is very sensitive.",quote:{zh:"良心，是灵魂\n拒绝遗忘的部分。",en:"Conscience is the part\nof the soul that refuses to forget.",author:"—"}},
  {zh:"我很容易被他人情绪所感染，能够感同身受。",en:"I am easily overwhelmed by others' emotions.",quote:{zh:"共情，是把别人的痛\n短暂地借住在自己身上。",en:"Empathy is letting another's pain\ntake temporary shelter in you.",author:"—"}},
  {zh:"我倾向于对生活保持深思熟虑和感恩的态度。",en:"I tend to be very thoughtful about life.",quote:{zh:"凡是深刻感受过的，\n都不会真正消失。",en:"All that is deeply felt\nnever truly disappears.",author:"Rainer Maria Rilke"}},
  {zh:"我不喜欢暴力的电影或电视节目。",en:"I dislike violent movies or TV shows.",quote:{zh:"拒绝残忍，\n是对美的一种坚持。",en:"Refusing cruelty\nis an insistence on beauty.",author:"—"}},
  {zh:"我讨厌被人盯着看，或被评判的感觉。",en:"I don't like being watched or judged.",quote:{zh:"最自由的时刻，\n是无人注视的时候。",en:"The freest moment\nis when no one is watching.",author:"—"}},
  {zh:"当我饿了的时候，我无法专注并且情绪变差。",en:"When hungry, I can't concentrate and feel bad-tempered.",quote:{zh:"身体的需求，\n从不是小事。",en:"The needs of the body\nare never trivial.",author:"—"}},
  {zh:"生命中的变化会让我感到不安。",en:"Changes in my life shake me up deeply.",quote:{zh:"黑夜无论怎样悠长，\n白昼总会到来。",en:"No matter how long the night,\nthe day will come.",author:"African Proverb"}},
  {zh:"我注意到并欣赏精细的气味、味道、声音和艺术。",en:"I notice and enjoy delicate scents, tastes, sounds, and art.",quote:{zh:"美，\n从不缺席，只是有人看不见。",en:"Beauty is never absent.\nSome simply cannot see it.",author:"—"}},
  {zh:"当我非常烦恼时，我会设法避免让自己进入那种情况。",en:"When overwhelmed, I arrange things to avoid further upset.",quote:{zh:"懂得保护自己，\n也是一种勇气。",en:"Knowing how to protect yourself\nis also a form of courage.",author:"—"}},
];

const HSS = [
  {zh:"我喜欢尝试新的、令人兴奋的食物，即使我不确定会不会喜欢。",en:"I like to try new foods even if I'm unsure I'll enjoy them.",quote:{zh:"生命太短，\n不足以只吃熟悉的食物。",en:"Life is too short\nto eat only what you know.",author:"—"}},
  {zh:"我会被危险的活动所吸引，比如攀岩或高空跳伞。",en:"I am attracted to dangerous activities like rock climbing or skydiving.",quote:{zh:"边缘，\n才能看见最远的风景。",en:"Only at the edge\ncan you see the farthest view.",author:"—"}},
  {zh:"我喜欢结交来自不同背景的陌生人。",en:"I like to meet people from different backgrounds.",quote:{zh:"陌生人，\n是尚未展开的故事。",en:"A stranger is a story\nnot yet told.",author:"—"}},
  {zh:"我更喜欢不可预测的朋友，而不是一成不变的人。",en:"I prefer unpredictable friends to predictable ones.",quote:{zh:"可预测的人生\n是一张已读完的书。",en:"A predictable life\nis a book already read.",author:"—"}},
  {zh:"我经常想做一些会让别人震惊或感到不安的事情。",en:"I often wish I could do things that would shock others.",quote:{zh:"颠覆，\n是另一种形式的诚实。",en:"Disruption\nis another form of honesty.",author:"—"}},
  {zh:"我喜欢欣赏抽象或超现实主义的艺术作品。",en:"I enjoy abstract or surrealist art.",quote:{zh:"混乱中有一种\n别样的秩序。",en:"There is a different kind\nof order in chaos.",author:"—"}},
  {zh:"在旅行时，我更喜欢去那些未知的目的地。",en:"When traveling, I prefer unknown destinations.",quote:{zh:"迷路，\n有时是最好的发现。",en:"Getting lost\nis sometimes the best discovery.",author:"—"}},
  {zh:"我喜欢派对或社交活动上的刺激与兴奋。",en:"I enjoy the excitement of parties and social events.",quote:{zh:"人群中，\n也可以感到一种狂喜。",en:"Even in a crowd\none can feel a kind of ecstasy.",author:"—"}},
  {zh:"我在潜水时被奇异的海底生物所吸引。",en:"Strange undersea creatures fascinate me when diving.",quote:{zh:"深海从不空洞，\n它只是沉默。",en:"The deep sea is never empty—\nit only keeps quiet.",author:"—"}},
  {zh:"我希望能体验飞翔或滑翔的感觉。",en:"I would like to experience the feeling of flying or gliding.",quote:{zh:"自由，\n首先是一种身体的感受。",en:"Freedom is first\na sensation in the body.",author:"—"}},
  {zh:"我对新奇体验或意识边界的探索感到好奇。",en:"I am curious about exploring new experiences and altered states.",quote:{zh:"好奇，\n是所有探险的起点。",en:"Curiosity is the beginning\nof every adventure.",author:"—"}},
  {zh:"我讨厌做重复性的工作，即使这份工作薪水不错。",en:"I hate repetitive work even if it pays well.",quote:{zh:"重复是死亡\n用另一种方式到来。",en:"Repetition is death\narriving in another form.",author:"—"}},
  {zh:"我喜欢和不同寻常或奇特的人交往。",en:"I enjoy the company of unusual or eccentric people.",quote:{zh:"正常，\n只是一种被接受的疯狂。",en:"Normal is merely\nan accepted form of madness.",author:"—"}},
  {zh:"我倾向于在没有太多计划的情况下开始新项目。",en:"I tend to start new projects without much planning.",quote:{zh:"计划太多，\n往往是恐惧的别名。",en:"Too much planning\nis often another name for fear.",author:"—"}},
  {zh:"我喜欢恐怖电影和鬼怪故事。",en:"I enjoy horror movies and ghost stories.",quote:{zh:"黑暗，\n是我们尚未理解的光。",en:"Darkness is the light\nwe have not yet understood.",author:"—"}},
  {zh:"即使在我疲惫的时候，我仍然想去参加聚会。",en:"Even when tired, I still want to attend a party.",quote:{zh:"某些疲惫，\n只有人群才能治愈。",en:"Some fatigue\nonly crowds can cure.",author:"—"}},
  {zh:"我喜欢在陌生的城市随意漫步，没有明确目的地。",en:"I enjoy wandering in unknown cities without a clear destination.",quote:{zh:"游荡，\n是最诚实的旅行方式。",en:"Wandering is the most\nhonest way to travel.",author:"—"}},
  {zh:"我觉得和那些沉闷或无聊的人在一起很难受。",en:"I find it hard to be with dull or boring people.",quote:{zh:"无聊是一种\n轻微的窒息。",en:"Boredom is a mild\nform of suffocation.",author:"—"}},
  {zh:"我享受在现场音乐表演中被声音淹没的感觉。",en:"I enjoy being overwhelmed by sound at live concerts.",quote:{zh:"好的音乐，\n会让身体记住。",en:"Good music\nleaves a memory in the body.",author:"—"}},
  {zh:"我喜欢冒险性的运动，比如冲浪或摩托车骑行。",en:"I enjoy adventurous sports like surfing or motorcycling.",quote:{zh:"速度，\n是一种短暂的永恒。",en:"Speed is a brief\nform of eternity.",author:"—"}},
  {zh:"我讨厌循规蹈矩，更喜欢打破常规。",en:"I dislike conformity and prefer breaking rules.",quote:{zh:"规则是为那些\n缺乏判断力的人设计的。",en:"Rules are designed\nfor those who lack judgment.",author:"—"}},
  {zh:"我喜欢认识新朋友，即使这需要我走出舒适区。",en:"I enjoy meeting new people even if it pushes me out of my comfort zone.",quote:{zh:"舒适区的边界，\n也是成长的起点。",en:"The edge of your comfort zone\nis where growth begins.",author:"—"}},
  {zh:"我经常感到无聊，需要寻找新的刺激。",en:"I often feel bored and need to seek new stimulation.",quote:{zh:"无聊是灵魂在呼唤\n一个更真实的自己。",en:"Boredom is the soul calling\nfor a more authentic self.",author:"Albert Camus"}},
  {zh:"我宁愿做一份充满挑战和变化的工作，也不愿做一份稳定但单调的工作。",en:"I prefer a challenging job over a stable but dull one.",quote:{zh:"稳定，\n有时只是停滞的另一个词。",en:"Stability is sometimes\njust another word for stagnation.",author:"—"}},
  {zh:"我喜欢探索新的想法，即使它们可能是有争议的。",en:"I enjoy exploring new ideas even if they might be controversial.",quote:{zh:"所有伟大的想法\n起初都看起来很疯狂。",en:"All great ideas\nfirst appeared to be mad.",author:"—"}},
  {zh:"我更喜欢和充满活力的人在一起，而不是那些安静内向的人。",en:"I prefer energetic company over quiet, introverted people.",quote:{zh:"能量，\n是一种会传染的语言。",en:"Energy is a language\nthat spreads.",author:"—"}},
  {zh:"我享受在陌生或令人毛骨悚然的地方探索。",en:"I enjoy exploring strange or eerie places.",quote:{zh:"陌生地方的空气\n总是更清新。",en:"The air in unfamiliar places\nis always fresher.",author:"—"}},
  {zh:"我喜欢争论和激烈的辩论，即使没有明确的结论。",en:"I enjoy arguments and heated debates even without conclusions.",quote:{zh:"碰撞，\n是思想的交配仪式。",en:"Collision is the mating ritual\nof ideas.",author:"—"}},
  {zh:"我喜欢观看或参与极限运动。",en:"I enjoy watching or participating in extreme sports.",quote:{zh:"极限，\n是人类对重力的谈判。",en:"Extremes are humanity's\nnegotiation with gravity.",author:"—"}},
  {zh:"我喜欢颠覆传统艺术形式或音乐风格。",en:"I enjoy subverting traditional art forms or musical styles.",quote:{zh:"传统是过去的创新，\n颠覆是未来的传统。",en:"Tradition is past innovation;\ndisruption is future tradition.",author:"—"}},
  {zh:"我在陌生人面前也能轻松开始对话。",en:"I can easily start conversations with strangers.",quote:{zh:"每一次对话，\n都是一次小小的冒险。",en:"Every conversation\nis a small adventure.",author:"—"}},
  {zh:"我会为了寻求刺激而做一些轻微违反规则的事情。",en:"I would bend minor rules for the thrill of it.",quote:{zh:"有些边界，\n存在就是为了被测试的。",en:"Some boundaries exist\nonly to be tested.",author:"—"}},
  {zh:"我喜欢暴露于新想法和陌生哲学观点。",en:"I enjoy exposure to new ideas and unfamiliar philosophical views.",quote:{zh:"每一个陌生的想法\n都是对自我的一次扩张。",en:"Every strange idea\nis an expansion of the self.",author:"—"}},
  {zh:"我会在冲动下做出一些别人认为鲁莽的决定。",en:"I make impulsive decisions that others might consider reckless.",quote:{zh:"冲动，\n是未经审查的直觉。",en:"Impulse is intuition\nbefore it gets edited.",author:"—"}},
  {zh:"我喜欢参加各种新鲜有趣的社交实验或活动。",en:"I enjoy novel social experiments or unusual activities.",quote:{zh:"实验，\n是对确定性的温柔反抗。",en:"Experiment is a gentle\nrebellion against certainty.",author:"—"}},
  {zh:"我不喜欢总是和同样的人做同样的事情。",en:"I dislike always doing the same things with the same people.",quote:{zh:"重复，\n是记忆的敌人。",en:"Repetition is the enemy\nof memory.",author:"—"}},
  {zh:"我渴望体验那些不寻常的意识状态，如极度运动或冥想。",en:"I crave unusual states of consciousness like extreme exercise or deep meditation.",quote:{zh:"意识，\n是一个还未被完全绘制的大陆。",en:"Consciousness is a continent\nnot yet fully mapped.",author:"—"}},
  {zh:"我认为不确定性和风险是生活中令人兴奋的一部分。",en:"I see uncertainty and risk as exciting parts of life.",quote:{zh:"不确定性，\n是所有可能性的子宫。",en:"Uncertainty is the womb\nof all possibility.",author:"—"}},
  {zh:"我喜欢尝试不同文化的习俗和仪式。",en:"I enjoy trying customs and rituals from different cultures.",quote:{zh:"文化是一扇门，\n走进去就不一样了。",en:"Culture is a door;\nstep through and you change.",author:"—"}},
  {zh:"我对未知的旅程比对安全的目的地更感兴趣。",en:"I'm more interested in unknown journeys than safe destinations.",quote:{zh:"目的地只是借口，\n旅程才是答案。",en:"The destination is just an excuse;\nthe journey is the answer.",author:"—"}},
];

const ECR = [
  {zh:"我更喜欢不向他人展示自己内心真实的感受。",en:"I prefer not to show others how I feel deep down.",quote:{zh:"真实，\n是一种需要练习的勇气。",en:"Authenticity is a courage\nthat takes practice.",author:"Brené Brown"}},
  {zh:"我担心被遗弃。",en:"I worry about being abandoned.",quote:{zh:"害怕失去，\n说明曾经真正拥有。",en:"Fear of losing means\nyou once truly had.",author:"—"}},
  {zh:"我觉得与亲密的人分享想法和感受很自在。",en:"I find it easy to share thoughts and feelings with close others.",quote:{zh:"分享，\n是孤独的解药。",en:"Sharing is the antidote\nto loneliness.",author:"—"}},
  {zh:"我经常担心我的伴侣不是真的爱我。",en:"I often worry that my partner doesn't really love me.",quote:{zh:"爱，\n需要被一次次确认，直到我们相信。",en:"Love needs to be confirmed\nagain and again until we believe it.",author:"—"}},
  {zh:"我觉得向他人寻求帮助或依靠他人很难。",en:"I find it difficult to rely on others or seek help.",quote:{zh:"脆弱，\n是真正连接的入口。",en:"Vulnerability is the doorway\nto true connection.",author:"Brené Brown"}},
  {zh:"我不担心被人抛弃。",en:"I don't worry about being abandoned.",quote:{zh:"安全感，\n是给自己的礼物。",en:"Security is the gift\nyou give yourself.",author:"—"}},
  {zh:"我讨厌和伴侣过于亲近。",en:"I dislike getting too close to my partner.",quote:{zh:"距离，\n有时是爱的另一种语言。",en:"Distance is sometimes\nanother language of love.",author:"—"}},
  {zh:"当我需要帮助时，我不知道该向谁求助。",en:"I don't know who to turn to when I need help.",quote:{zh:"孤独，\n不是没有人，而是没有人懂。",en:"Loneliness is not having no one—\nit's having no one who understands.",author:"—"}},
  {zh:"我对亲近关系感到不舒服。",en:"I feel uncomfortable with closeness in relationships.",quote:{zh:"亲密，\n是我们最想要也最害怕的事。",en:"Intimacy is what we want most\nand fear most.",author:"—"}},
  {zh:"我经常希望伴侣对我的感情和我一样深。",en:"I often wish my partner's feelings for me were as strong as mine.",quote:{zh:"爱不对等，\n是人类最古老的悲剧之一。",en:"Unequal love is one of\nhumanity's oldest tragedies.",author:"—"}},
  {zh:"我想亲近别人，但又总想保持距离。",en:"I want to be close to others but keep pulling away.",quote:{zh:"矛盾，\n是所有深刻情感的标志。",en:"Contradiction is the mark\nof all profound feelings.",author:"—"}},
  {zh:"我经常想要与伴侣融为一体，但这有时会吓到对方。",en:"I want to merge with my partner, but this sometimes scares them away.",quote:{zh:"全然给出，\n是最危险的慷慨。",en:"Giving yourself completely\nis the most dangerous generosity.",author:"—"}},
  {zh:"我对太过依赖他人感到不安。",en:"I feel nervous when I rely too much on others.",quote:{zh:"独立，\n是自我尊重的基础。",en:"Independence is the foundation\nof self-respect.",author:"—"}},
  {zh:"我担心孤单一人。",en:"I worry about being alone.",quote:{zh:"独处与孤独，\n是同一件事的两张面孔。",en:"Solitude and loneliness\nare two faces of the same thing.",author:"—"}},
  {zh:"与他人分享感受会使我感到不舒服。",en:"Sharing my feelings with others makes me uncomfortable.",quote:{zh:"言说，\n有时比沉默更需要勇气。",en:"Speaking out sometimes\ntakes more courage than silence.",author:"—"}},
  {zh:"我渴望与伴侣非常亲密。",en:"I yearn to be very close to my partner.",quote:{zh:"渴望，\n是爱的另一个名字。",en:"Longing is just\nanother name for love.",author:"—"}},
  {zh:"我不太担心被人抛弃。",en:"I'm not too worried about being abandoned.",quote:{zh:"信任，\n是最轻盈的重量。",en:"Trust is the lightest\nkind of weight.",author:"—"}},
  {zh:"我觉得别人不愿意像我希望的那样亲近我。",en:"I feel others are reluctant to be as close as I'd like.",quote:{zh:"所有人都渴望被看见，\n但不是所有人都愿意被看见。",en:"Everyone longs to be seen,\nbut not everyone dares to be.",author:"—"}},
  {zh:"我通常和伴侣讨论我的问题和担忧。",en:"I usually discuss my problems and concerns with my partner.",quote:{zh:"被倾听，\n是一种治愈。",en:"Being heard\nis a form of healing.",author:"—"}},
  {zh:"当与伴侣分开时，我会感到非常焦虑。",en:"I feel anxious when separated from my partner.",quote:{zh:"分离，\n是检验连接深度的试纸。",en:"Separation is the litmus test\nof how deep the connection runs.",author:"—"}},
  {zh:"我觉得向伴侣倾诉自己的感受很困难。",en:"I find it difficult to tell my partner about my feelings.",quote:{zh:"表达，\n是爱最脆弱的部分。",en:"Expression is the most fragile\npart of love.",author:"—"}},
  {zh:"当我在一段关系中感到不安全时，我会变得易怒或愤怒。",en:"When I feel insecure in a relationship, I become irritable or angry.",quote:{zh:"愤怒，\n往往是受伤的外衣。",en:"Anger is often\nfear wearing a coat.",author:"—"}},
  {zh:"我认为其他人不愿意接受我本来的样子。",en:"I feel that others will not accept me as I am.",quote:{zh:"被接受，\n是所有人最深的渴望。",en:"To be accepted as you are\nis the deepest human longing.",author:"—"}},
  {zh:"在一段关系中，我倾向于感到不安全。",en:"In relationships, I tend to feel insecure.",quote:{zh:"不安全感，\n是我们还没修好的童年。",en:"Insecurity is the childhood wound\nwe haven't yet healed.",author:"—"}},
  {zh:"我更喜欢不依靠任何人。",en:"I prefer not to depend on anyone.",quote:{zh:"自给自足，\n有时是受伤之后的铠甲。",en:"Self-sufficiency is sometimes\narmor put on after a wound.",author:"—"}},
  {zh:"我有时感觉我在迫使伴侣对我表现出更多的感情和承诺。",en:"I sometimes feel I'm pushing my partner for more affection and commitment.",quote:{zh:"推拉之间，\n是爱的边界焦虑。",en:"Push and pull—\nthe anxiety of love's boundaries.",author:"—"}},
  {zh:"我告诉我的伴侣几乎所有的事情。",en:"I tell my partner almost everything.",quote:{zh:"透明，\n是亲密关系的终极形式。",en:"Transparency is the ultimate form\nof intimacy.",author:"—"}},
  {zh:"有时，我无缘无故地感到对伴侣的愤怒。",en:"Sometimes I feel angry at my partner for no clear reason.",quote:{zh:"无名之火，\n往往有名有姓。",en:"Nameless anger\nusually has a name after all.",author:"—"}},
  {zh:"当我不在某人身边时，我担心他们可能会对他人产生兴趣。",en:"When apart, I worry they may become interested in others.",quote:{zh:"嫉妒，\n是爱的影子。",en:"Jealousy is the shadow\nthat love casts.",author:"—"}},
  {zh:"在情感上和他人亲密对我来说是困难的。",en:"Being emotionally close to others is difficult for me.",quote:{zh:"情感的墙，\n是过去筑的，现在住的。",en:"Emotional walls are built in the past\nand lived in the present.",author:"—"}},
  {zh:"我担心伴侣不像我在乎他们那样在乎我。",en:"I worry that my partner doesn't care for me as much as I care for them.",quote:{zh:"不对等的爱，\n是最重的孤独。",en:"Unequal love\nis the heaviest loneliness.",author:"—"}},
  {zh:"我不担心独处。",en:"I don't worry about being alone.",quote:{zh:"独处，\n是学会和自己相处。",en:"Solitude is learning\nto keep yourself company.",author:"—"}},
  {zh:"我觉得与伴侣亲近非常舒适。",en:"I feel comfortable being close to my partner.",quote:{zh:"舒适地靠近，\n是爱最平静的样子。",en:"Being comfortably close\nis love at its calmest.",author:"—"}},
  {zh:"我发现很难完全信任我的伴侣。",en:"I find it difficult to completely trust my partner.",quote:{zh:"信任，\n是缓慢生长的植物。",en:"Trust is a slowly growing plant.",author:"—"}},
  {zh:"我渴望亲密，但觉得自己不值得被爱。",en:"I yearn for intimacy but feel unworthy of love.",quote:{zh:"值得被爱，\n是每个人的出厂设置。",en:"Being worthy of love\nis everyone's default setting.",author:"—"}},
  {zh:"当伴侣试图与我非常亲近时，我会感到不舒服。",en:"I feel uncomfortable when partners try to get very close to me.",quote:{zh:"靠近是对的，\n但边界也是对的。",en:"Getting close is right.\nSo are boundaries.",author:"—"}},
];

// Big Five IPIP-50 (openness, conscientiousness, extraversion, agreeableness, neuroticism)
const BIG5 = [
  {zh:"我对各种不同的事物都感到好奇。",en:"I am curious about many different things.",quote:{zh:"好奇心\n是智识的呼吸。",en:"Curiosity\nis the breath of intellect.",author:"—"}},
  {zh:"我总是做好准备。",en:"I am always prepared.",quote:{zh:"准备，\n是对未来的一种温柔控制。",en:"Preparation is a gentle\ncontrol over the future.",author:"—"}},
  {zh:"在聚会上，我喜欢和很多不同的人交谈。",en:"I talk to a lot of different people at parties.",quote:{zh:"每一张陌生的脸，\n都是一扇未开的门。",en:"Every unfamiliar face\nis an unopened door.",author:"—"}},
  {zh:"我对别人的感受很感兴趣。",en:"I am interested in people's feelings.",quote:{zh:"理解他人，\n是自我扩展的一种方式。",en:"Understanding others\nis a way of expanding yourself.",author:"—"}},
  {zh:"我常常感到忧郁。",en:"I often feel blue.",quote:{zh:"忧郁，\n是深思熟虑的颜色。",en:"Melancholy is the color\nof deep thought.",author:"—"}},
  {zh:"我有丰富的词汇量。",en:"I have a rich vocabulary.",quote:{zh:"语言是思想的\n最后一道边界。",en:"Language is the last frontier\nof thought.",author:"—"}},
  {zh:"我对细节很注意。",en:"I pay attention to details.",quote:{zh:"细节，\n是上帝藏身的地方。",en:"God is in the details.",author:"Aby Warburg"}},
  {zh:"我在人群中感到充满活力。",en:"I feel energized when around people.",quote:{zh:"人群，\n有时是最好的充电站。",en:"Crowds are sometimes\nthe best charging stations.",author:"—"}},
  {zh:"我同情别人的感受。",en:"I sympathize with others' feelings.",quote:{zh:"同情，\n是文明的黏合剂。",en:"Sympathy\nis the glue of civilization.",author:"—"}},
  {zh:"我容易感到压力。",en:"I get stressed out easily.",quote:{zh:"压力，\n是身体在说太多了。",en:"Stress is the body saying:\nthat's too much.",author:"—"}},
  {zh:"我有生动的想象力。",en:"I have a vivid imagination.",quote:{zh:"想象力，\n比知识更重要。",en:"Imagination is more important\nthan knowledge.",author:"Albert Einstein"}},
  {zh:"我从不忘记把东西放回原处。",en:"I never forget to put things back in their proper place.",quote:{zh:"秩序，\n是对混乱世界的一种回应。",en:"Order is an answer\nto a chaotic world.",author:"—"}},
  {zh:"我很少感到兴奋。",en:"I don't get excited very easily.",quote:{zh:"平静，\n也是一种完整。",en:"Calm\nis also a wholeness.",author:"—"}},
  {zh:"我对别人有温暖的感情。",en:"I feel warm toward others.",quote:{zh:"温暖，\n是人类最古老的语言。",en:"Warmth is humanity's\noldest language.",author:"—"}},
  {zh:"我的情绪变化很快。",en:"My moods change easily.",quote:{zh:"情绪的流动，\n说明你还活着。",en:"The flow of emotion\nproves you are alive.",author:"—"}},
  {zh:"我很难理解抽象的概念。",en:"I have difficulty understanding abstract ideas.",quote:{zh:"理解，\n是一段持续的旅程。",en:"Understanding\nis a continuing journey.",author:"—"}},
  {zh:"我把事情按顺序排好。",en:"I like order.",quote:{zh:"顺序，\n是时间的礼物。",en:"Order\nis the gift of time.",author:"—"}},
  {zh:"我不怎么说话。",en:"I don't talk a lot.",quote:{zh:"沉默，\n有时比语言更重。",en:"Silence is sometimes\nheavier than words.",author:"—"}},
  {zh:"我对别人不感兴趣。",en:"I am not really interested in others.",quote:{zh:"向内，\n也是一种探索。",en:"Turning inward\nis also a form of exploration.",author:"—"}},
  {zh:"我经常感到不安。",en:"I often feel discontented.",quote:{zh:"不安，\n是变化的前奏。",en:"Discontent is the prelude\nto change.",author:"—"}},
  {zh:"我很难理解新想法。",en:"I have difficulty imagining things.",quote:{zh:"理解新事物，\n需要给自己时间。",en:"Understanding new things\ntakes time—give yourself that.",author:"—"}},
  {zh:"我喜欢按时完成任务。",en:"I follow a schedule.",quote:{zh:"时间表，\n是自由的骨架。",en:"A schedule is the skeleton\nof freedom.",author:"—"}},
  {zh:"我喜欢成为人群关注的焦点。",en:"I like to be the center of attention.",quote:{zh:"被看见，\n是一种古老的需要。",en:"Being seen\nis an ancient need.",author:"—"}},
  {zh:"我对别人的问题感同身受。",en:"I take time out for others.",quote:{zh:"时间，\n是最昂贵的礼物。",en:"Time is the most expensive gift.",author:"—"}},
  {zh:"我为自己担忧。",en:"I worry about things.",quote:{zh:"担忧，\n是未来投在当下的影子。",en:"Worry is the shadow\nthe future casts on the present.",author:"—"}},
  {zh:"我有出色的想法。",en:"I have excellent ideas.",quote:{zh:"想法，\n是世界改变的起点。",en:"Ideas are where\nthe world begins to change.",author:"—"}},
  {zh:"我做事情有一贯的规律。",en:"I do things according to a plan.",quote:{zh:"计划，\n是意志的图纸。",en:"A plan is a blueprint\nfor the will.",author:"—"}},
  {zh:"我在他人陪伴下感觉很好。",en:"I feel comfortable around people.",quote:{zh:"陪伴，\n是最轻的重量。",en:"Company\nis the lightest of weights.",author:"—"}},
  {zh:"我相信他人有好意。",en:"I believe others have good intentions.",quote:{zh:"信任，\n是给世界的一次赌注。",en:"Trust is a wager\nyou place on the world.",author:"—"}},
  {zh:"我情绪容易激动。",en:"I get upset easily.",quote:{zh:"激动，\n是心还在认真对待生活。",en:"Being moved\nmeans life still matters to you.",author:"—"}},
  {zh:"我喜欢反思。",en:"I spend time reflecting on things.",quote:{zh:"反思，\n是意识对自身的凝视。",en:"Reflection is consciousness\nglazing at itself.",author:"—"}},
  {zh:"我经常忘记把东西放回原处。",en:"I often forget to put things back in their proper place.",quote:{zh:"遗忘，\n是大脑的自我保护。",en:"Forgetting\nis the brain's self-protection.",author:"—"}},
  {zh:"我不太喜欢闲聊。",en:"I don't enjoy small talk.",quote:{zh:"深度对话，\n才是真正的相遇。",en:"Deep conversation\nis the real meeting.",author:"—"}},
  {zh:"我把别人的利益放在心上。",en:"I take others' interests to heart.",quote:{zh:"关怀他人，\n是超越自我的练习。",en:"Caring for others\nis practice in transcending the self.",author:"—"}},
  {zh:"我容易感到沮丧。",en:"I easily feel down.",quote:{zh:"沮丧，\n是期待遭遇现实的声音。",en:"Dejection is the sound\nof expectation meeting reality.",author:"—"}},
  {zh:"我需要时间才能理解抽象的概念。",en:"I need a lot of time to understand abstractions.",quote:{zh:"慢慢来，\n有时是最快的方式。",en:"Going slowly\nis sometimes the fastest way.",author:"—"}},
  {zh:"我喜欢整洁。",en:"I like order and cleanliness.",quote:{zh:"整洁，\n是思维的外部表达。",en:"Tidiness is the outer expression\nof a clear mind.",author:"—"}},
  {zh:"我在大多数情况下都能找到话题。",en:"I can talk for hours.",quote:{zh:"语言，\n是人类最长的发明。",en:"Language is humanity's\nlongest invention.",author:"—"}},
  {zh:"我对他人的需求敏感。",en:"I am sensitive to others' needs.",quote:{zh:"敏锐地感知他人，\n是一种天赋也是一种重量。",en:"Sensing others deeply\nis both a gift and a weight.",author:"—"}},
  {zh:"我有时感到自己毫无价值。",en:"I sometimes feel worthless.",quote:{zh:"价值，\n不是被衡量出来的，是被感受到的。",en:"Worth is not measured;\nit is felt.",author:"—"}},
  {zh:"我在头脑中塑造鲜活的形象。",en:"I create vivid mental images.",quote:{zh:"想象，\n是唯一不受重力约束的能力。",en:"Imagination is the only ability\nunbound by gravity.",author:"—"}},
  {zh:"我的工作台总是整洁。",en:"I keep my desk clean.",quote:{zh:"清空桌面，\n有时也是清空心智。",en:"Clearing the desk\nis sometimes clearing the mind.",author:"—"}},
  {zh:"我很难接近陌生人。",en:"I find it difficult to approach others.",quote:{zh:"接近陌生人，\n需要对自己的一点信心。",en:"Approaching strangers\ntakes a little faith in yourself.",author:"—"}},
  {zh:"我让别人感到舒适。",en:"I make people feel at ease.",quote:{zh:"让人放松，\n是一种隐形的力量。",en:"Making others comfortable\nis an invisible power.",author:"—"}},
  {zh:"我经历过高潮和低谷。",en:"I experience ups and downs.",quote:{zh:"起伏，\n是生命的基本节奏。",en:"Ups and downs\nare life's basic rhythm.",author:"—"}},
  {zh:"我有丰富的词汇量来表达自己。",en:"I express my ideas well.",quote:{zh:"表达，\n是思想找到出口的那一刻。",en:"Expression is the moment\nthought finds its exit.",author:"—"}},
  {zh:"我喜欢制定计划并坚持执行。",en:"I like to plan and carry out plans.",quote:{zh:"执行，\n是梦想与现实之间的桥。",en:"Execution is the bridge\nbetween dream and reality.",author:"—"}},
  {zh:"我对结识新朋友犹豫不决。",en:"I hold back my opinions.",quote:{zh:"等待，\n有时是最有力的发言。",en:"Waiting\nis sometimes the most powerful statement.",author:"—"}},
  {zh:"我把人们的感受放在心上。",en:"I take people's feelings to heart.",quote:{zh:"把别人的感受放进心里，\n也是一种修行。",en:"Holding others' feelings in your heart\nis a practice in itself.",author:"—"}},
  {zh:"我比其他人更容易感到恐惧。",en:"I panic easily.",quote:{zh:"恐惧，\n是还未学会的课程。",en:"Fear is a lesson\nnot yet learned.",author:"—"}},
];

// NEO Openness to Experience (30 items)
const OPENNESS = [
  {zh:"我经常尝试新的、不同的食物。",en:"I frequently try new and different foods.",quote:{zh:"每一种味道，\n都是一个新世界的入口。",en:"Every taste\nis the entrance to a new world.",author:"—"}},
  {zh:"我对艺术中的形式和色彩非常感兴趣。",en:"I am very interested in form and color in art.",quote:{zh:"色彩，\n是情感的视觉语言。",en:"Color is the visual\nlanguage of emotion.",author:"Wassily Kandinsky"}},
  {zh:"我相信不同的伦理观对不同的人是有效的。",en:"I believe in the importance of different ethical points of view.",quote:{zh:"道德，\n从来不是单一的颜色。",en:"Morality was never\na single color.",author:"—"}},
  {zh:"我对诗歌的兴趣不大。",en:"I have little interest in poetry.",quote:{zh:"诗歌是语言\n最边缘的冒险。",en:"Poetry is language's\nmost daring adventure.",author:"—"}},
  {zh:"我对哲学讨论很感兴趣。",en:"I find philosophical discussions interesting.",quote:{zh:"哲学，\n是对显而易见之物的怀疑。",en:"Philosophy is doubt\ncast on the obvious.",author:"—"}},
  {zh:"我有一种非常活跃的想象力。",en:"I have a very active imagination.",quote:{zh:"想象，\n是思维拒绝被现实边界约束的方式。",en:"Imagination is the mind's\nrefusal to be bounded by reality.",author:"—"}},
  {zh:"我很少关注自己的感受。",en:"I rarely pay attention to my own feelings.",quote:{zh:"感受，\n是内心最诚实的信使。",en:"Feelings are the most honest\nmessengers from within.",author:"—"}},
  {zh:"我认为与来自不同文化的人交流是令人激动的。",en:"I find interacting with people from different cultures exciting.",quote:{zh:"文化差异，\n是世界最生动的教科书。",en:"Cultural difference is the world's\nmost vivid textbook.",author:"—"}},
  {zh:"我经常沉浸在自己的想法中。",en:"I often become absorbed in my own thoughts.",quote:{zh:"沉浸，\n是专注的最高形态。",en:"Absorption\nis the highest form of focus.",author:"—"}},
  {zh:"我有宽广的审美兴趣。",en:"I have wide aesthetic interests.",quote:{zh:"美无处不在，\n只需打开不同的眼睛。",en:"Beauty is everywhere;\nyou only need different eyes.",author:"—"}},
  {zh:"我经常沉迷于某一想法或画面。",en:"I often get caught up in an idea or image.",quote:{zh:"着迷，\n是通向深度的隧道。",en:"Fascination\nis the tunnel into depth.",author:"—"}},
  {zh:"我不太关注抽象事物。",en:"I don't pay much attention to abstract matters.",quote:{zh:"抽象，\n是具体的骨架。",en:"The abstract is the skeleton\nof the concrete.",author:"—"}},
  {zh:"我喜欢戏剧中角色的塑造。",en:"I enjoy playing with theories or abstract ideas.",quote:{zh:"理论，\n是现实的另一种诗歌。",en:"Theory is just\nanother kind of poetry about reality.",author:"—"}},
  {zh:"我对探索不同的观点感兴趣。",en:"I am interested in exploring different points of view.",quote:{zh:"换一个角度，\n世界就不同了。",en:"Change your angle,\nand the world changes.",author:"—"}},
  {zh:"我觉得各种文化的音乐都很美。",en:"I find music from different cultures beautiful.",quote:{zh:"音乐跨越语言，\n直抵灵魂。",en:"Music crosses language\nand reaches the soul.",author:"—"}},
  {zh:"我对大自然的美丽感到着迷。",en:"I am fascinated by natural beauty.",quote:{zh:"自然，\n是人类最古老的庙宇。",en:"Nature is humanity's\nmost ancient temple.",author:"—"}},
  {zh:"我对新事物充满热情。",en:"I am enthusiastic about new things.",quote:{zh:"热情，\n是创造力的燃料。",en:"Enthusiasm\nis the fuel of creativity.",author:"—"}},
  {zh:"我有时会质疑宗教或政治上的权威观念。",en:"I sometimes challenge religious or political authorities.",quote:{zh:"质疑，\n是独立思考的起点。",en:"Questioning\nis the starting point of independent thought.",author:"—"}},
  {zh:"我喜欢在不确定中思考。",en:"I enjoy thinking in uncertainty.",quote:{zh:"不确定，\n是所有创造力的沃土。",en:"Uncertainty\nis the fertile soil of all creativity.",author:"—"}},
  {zh:"我感到与大自然融为一体。",en:"I feel a sense of oneness with nature.",quote:{zh:"我们从自然中来，\n也会回到自然中去。",en:"We came from nature\nand will return to it.",author:"—"}},
  {zh:"当我读诗时，我能感受到它的意义。",en:"When I read poetry, I feel its meaning.",quote:{zh:"诗，\n是语言在月光下走路。",en:"Poetry is language\nwalking in moonlight.",author:"—"}},
  {zh:"我对他人的内心生活感到好奇。",en:"I am curious about others' inner lives.",quote:{zh:"每个人内心，\n都住着一个陌生人。",en:"A stranger lives inside\nevery person.",author:"—"}},
  {zh:"我喜欢用各种不同的方法来完成事情。",en:"I like to try many different approaches.",quote:{zh:"方法，\n是通往答案的不同路径。",en:"Methods are different paths\nto the same answer.",author:"—"}},
  {zh:"我通过艺术来表达我的感受。",en:"I use art to express my feelings.",quote:{zh:"艺术，\n是感受的最后出口。",en:"Art is feeling's\nlast exit.",author:"—"}},
  {zh:"我对自己的感受有深刻的认识。",en:"I have a deep knowledge of my own feelings.",quote:{zh:"认识自己，\n是所有认识的起点。",en:"Knowing yourself\nis the beginning of all knowing.",author:"Aristotle"}},
  {zh:"我觉得看电影是一种深刻的体验。",en:"I find watching films a profound experience.",quote:{zh:"电影，\n是梦的另一种语言。",en:"Film is another language\nfor dreaming.",author:"—"}},
  {zh:"我喜欢沉思存在的意义。",en:"I enjoy contemplating the meaning of existence.",quote:{zh:"存在，\n先于本质。",en:"Existence\nprecedes essence.",author:"Jean-Paul Sartre"}},
  {zh:"我经常被某种强烈的美感打动。",en:"I am often overwhelmed by a strong sense of beauty.",quote:{zh:"美，\n是一种毫无防备的震撼。",en:"Beauty is being struck\nwithout any defense.",author:"—"}},
  {zh:"我对真实地感受和理解自我感兴趣。",en:"I am genuinely interested in understanding myself.",quote:{zh:"自我，\n是一生都在探索的领域。",en:"The self is a territory\nexplored over a lifetime.",author:"—"}},
  {zh:"我的感受常常引发我的思考。",en:"My feelings often guide my thinking.",quote:{zh:"情感，\n是思想的罗盘。",en:"Emotion is the compass\nof thought.",author:"—"}},
];

// Self-compassion Scale (SCS-SF, 12 items, Kristin Neff)
const SCS = [
  {zh:"当我经历困难时，我会对自己充满关爱。",en:"I'm kind to myself when I'm going through a hard time.",quote:{zh:"对自己温柔，\n是一种需要学习的技能。",en:"Being gentle with yourself\nis a skill that must be learned.",author:"Kristin Neff"}},
  {zh:"当我失败时，我会把失败看成人类经验的一部分。",en:"I try to see my failures as part of the human condition.",quote:{zh:"失败，\n是人类共同的语言。",en:"Failure is a language\nwe all speak.",author:"—"}},
  {zh:"当我感到沮丧时，我会尝试以平衡的方式看待我的感受。",en:"When I'm feeling down I try to approach my feelings with curiosity.",quote:{zh:"平衡，\n不是中立，而是同时容纳两端。",en:"Balance is not neutrality;\nit is holding both ends.",author:"—"}},
  {zh:"当我经历某些困难时，我会告诉自己：大多数人也经历过这些。",en:"When things go wrong, I remind myself most people go through this.",quote:{zh:"共同的挣扎，\n让我们彼此相连。",en:"Shared struggle\nbinds us to each other.",author:"—"}},
  {zh:"当我感到情绪化时，我会试着观察它而不是被它淹没。",en:"When I'm feeling down, I try to observe rather than be overwhelmed.",quote:{zh:"观察自己的情绪，\n而不是成为它。",en:"Observe your emotions;\ndon't become them.",author:"—"}},
  {zh:"我对自己的缺点和不足之处很有耐心。",en:"I'm patient with my own flaws and shortcomings.",quote:{zh:"耐心，\n是给自己最深的善意。",en:"Patience with yourself\nis the deepest kindness.",author:"—"}},
  {zh:"当我遇到困难时，我会倾向于放大自己的缺陷。",en:"When things are going badly, I tend to obsess on everything wrong.",quote:{zh:"放大缺陷，\n是焦虑最常用的方式。",en:"Magnifying flaws\nis anxiety's favorite trick.",author:"—"}},
  {zh:"当我陷入困境时，我会提醒自己，其他人也在以各种方式挣扎。",en:"When I fail, I remind myself that most people fail sometimes too.",quote:{zh:"没有人是孤独地挣扎着的。",en:"No one struggles alone.",author:"—"}},
  {zh:"当我感到不满意时，我会平静地观察这种感受。",en:"When I'm feeling inadequate I try to keep things in perspective.",quote:{zh:"透视，\n是焦虑最好的解药。",en:"Perspective is the best\nantidote to anxiety.",author:"—"}},
  {zh:"当我感到沮丧时，我会对自己感到恼火。",en:"When I'm feeling down, I often feel most people are probably happier.",quote:{zh:"比较，\n是快乐的窃贼。",en:"Comparison\nis the thief of joy.",author:"Theodore Roosevelt"}},
  {zh:"当某些痛苦的事情发生时，我会尽量平衡地看待它。",en:"When something painful happens, I try to take a balanced view.",quote:{zh:"平衡地面对痛苦，\n是一种修炼。",en:"A balanced view of pain\nis a practice.",author:"—"}},
  {zh:"当我在某件事上失败时，我会被自我怀疑所吞噬。",en:"When I fail at something important I become consumed by self-doubt.",quote:{zh:"自我怀疑，\n是成长必经的隧道。",en:"Self-doubt is a tunnel\nall growth must pass through.",author:"—"}},
];

// Loneliness Scale (UCLA-3, 20 items)
const UCLA = [
  {zh:"我感到与周围的人缺乏陪伴。",en:"I feel that I lack companionship.",quote:{zh:"陪伴，\n是比言语更深的语言。",en:"Companionship is a language\ndeeper than words.",author:"—"}},
  {zh:"我感到被遗弃。",en:"I feel left out.",quote:{zh:"被排除在外，\n是古老的疼痛之一。",en:"Being left out\nis one of the oldest pains.",author:"—"}},
  {zh:"我感到与他人隔绝。",en:"I feel isolated from others.",quote:{zh:"隔绝，\n是孤独最锐利的形式。",en:"Isolation is loneliness\nin its sharpest form.",author:"—"}},
  {zh:"我有可以交谈的人。",en:"I have people I can talk to.",quote:{zh:"有人可以倾听，\n本身就是一种富有。",en:"Having someone who listens\nis its own kind of wealth.",author:"—"}},
  {zh:"我感到自己是朋友圈子的一部分。",en:"I feel part of a group of friends.",quote:{zh:"归属，\n是人类最基本的需要之一。",en:"Belonging is one of\nhumanity's most basic needs.",author:"—"}},
  {zh:"我和周围的人有很多共同点。",en:"I have a lot in common with people around me.",quote:{zh:"共同点，\n是关系的第一块砖。",en:"Common ground\nis the first brick of connection.",author:"—"}},
  {zh:"我不再亲近任何人了。",en:"I am no longer close to anyone.",quote:{zh:"亲密消失之后，\n还剩下什么？",en:"What remains\nafter intimacy is gone?",author:"—"}},
  {zh:"我的兴趣和想法与周围的人不同。",en:"My interests and ideas are not shared by those around me.",quote:{zh:"孤独的思想者，\n往往是时代的先行者。",en:"The solitary thinker\nis often ahead of their time.",author:"—"}},
  {zh:"我是一个外向的人。",en:"I am an outgoing person.",quote:{zh:"外向，\n只是内心的一种表达方式。",en:"Extroversion\nis just one way the inner speaks.",author:"—"}},
  {zh:"有人理解我。",en:"There are people who understand me.",quote:{zh:"被真正理解，\n是最深的温暖。",en:"To be truly understood\nis the deepest warmth.",author:"—"}},
  {zh:"我感到羞于见人。",en:"I feel shy.",quote:{zh:"羞涩，\n是自我保护的柔软形式。",en:"Shyness is a soft form\nof self-protection.",author:"—"}},
  {zh:"我感到人们几乎不了解我。",en:"I feel that people barely know me.",quote:{zh:"被了解，\n是一个缓慢的奇迹。",en:"Being known\nis a slow miracle.",author:"—"}},
  {zh:"我觉得自己与他人是隔绝的。",en:"I feel isolated from others.",quote:{zh:"隔绝，\n是孤独最锐利的形式。",en:"Isolation is the sharpest\nform of loneliness.",author:"—"}},
  {zh:"当我想要时，我可以找到人陪伴。",en:"I can find companionship when I want it.",quote:{zh:"选择独处，\n和被迫孤独，是两件事。",en:"Choosing solitude and being\nforced into it are different things.",author:"—"}},
  {zh:"有人我真正可以交谈的。",en:"There are people I can talk to.",quote:{zh:"真正的对话，\n需要两个同样在场的人。",en:"Real conversation needs\ntwo people fully present.",author:"—"}},
  {zh:"我的社交关系是肤浅的。",en:"My social relationships are superficial.",quote:{zh:"深度，\n需要时间来积淀。",en:"Depth\ntakes time to accumulate.",author:"—"}},
  {zh:"我感到没有人真正了解我。",en:"I feel that no one really knows me well.",quote:{zh:"被完全了解，\n是我们最深的渴望和最深的恐惧。",en:"To be fully known\nis our deepest desire and deepest fear.",author:"—"}},
  {zh:"我感到与他人的关系没有意义。",en:"I feel that my relationships with others lack meaning.",quote:{zh:"意义，\n不是找到的，是建构的。",en:"Meaning is not found;\nit is built.",author:"—"}},
  {zh:"没有人会注意到我是否消失了。",en:"No one would notice if I disappeared.",quote:{zh:"你的存在，\n比你以为的更重要。",en:"Your presence\nmatters more than you think.",author:"—"}},
  {zh:"我有人可以求助。",en:"There are people I can turn to.",quote:{zh:"知道有人可以求助，\n本身就是一种力量。",en:"Knowing someone is there\nis itself a strength.",author:"—"}},
];

// Perceived Stress Scale (PSS-10)
const PSS = [
  {zh:"在过去的一个月里，你有多少次因为某些意外的事情而感到心烦意乱？",en:"How often have you been upset by something unexpected?",quote:{zh:"意外，\n是生活拒绝被预测的方式。",en:"The unexpected is life's refusal\nto be predicted.",author:"—"}},
  {zh:"在过去的一个月里，你有多少次感到无法控制生活中重要的事情？",en:"How often have you felt unable to control important things in your life?",quote:{zh:"控制的幻觉，\n是我们和混沌之间最薄的墙。",en:"The illusion of control\nis the thinnest wall between us and chaos.",author:"—"}},
  {zh:"在过去的一个月里，你有多少次感到紧张和压力？",en:"How often have you felt nervous and stressed?",quote:{zh:"压力，\n是身体在说：此刻太多了。",en:"Stress is the body saying:\nthere is too much right now.",author:"—"}},
  {zh:"在过去的一个月里，你有多少次成功地处理了烦人的问题？",en:"How often have you successfully dealt with irritating life hassles?",quote:{zh:"处理麻烦，\n是日常英雄主义。",en:"Dealing with hassles\nis everyday heroism.",author:"—"}},
  {zh:"在过去的一个月里，你有多少次感到自己有效地应对了生活中的重大变化？",en:"How often have you felt you were effectively coping with important changes?",quote:{zh:"应对，\n是韧性最朴素的名字。",en:"Coping\nis resilience's plainest name.",author:"—"}},
  {zh:"在过去的一个月里，你有多少次感到有信心处理你的个人问题？",en:"How often have you felt confident about your ability to handle problems?",quote:{zh:"信心，\n是行动之前的预演。",en:"Confidence\nis a rehearsal before action.",author:"—"}},
  {zh:"在过去的一个月里，你有多少次感到事情都按你的意愿发展？",en:"How often have you felt things were going your way?",quote:{zh:"顺意，\n是短暂的馈赠，值得珍惜。",en:"Things going your way\nis a fleeting gift—cherish it.",author:"—"}},
  {zh:"在过去的一个月里，你有多少次发现自己无法应付所有必须做的事情？",en:"How often have you felt unable to cope with things you had to do?",quote:{zh:"应付不来，\n是人类共同的真相。",en:"Not being able to cope\nis a truth we all share.",author:"—"}},
  {zh:"在过去的一个月里，你有多少次能够控制生活中令你烦恼的事情？",en:"How often have you been able to control irritations in your life?",quote:{zh:"掌控，\n从来不是完全的。",en:"Control\nis never complete.",author:"—"}},
  {zh:"在过去的一个月里，你有多少次感到自己掌握了局面？",en:"How often have you felt on top of things?",quote:{zh:"掌握局面的感觉，\n是一种短暂的神性。",en:"Feeling on top of things\nis a brief taste of divinity.",author:"—"}},
];

const BANKS = [
  {id:"HSP", label:"高敏感人格量表", en:"Highly Sensitive Person Scale", questions:HSP},
  {id:"HSS", label:"感觉寻求量表", en:"Sensation Seeking Scale V", questions:HSS},
  {id:"ECR", label:"依恋类型量表", en:"Attachment Style (ECR-R)", questions:ECR},
  {id:"BIG5", label:"大五人格量表", en:"Big Five Personality (IPIP-50)", questions:BIG5},
  {id:"OPEN", label:"开放性体验量表", en:"Openness to Experience (NEO)", questions:OPENNESS},
  {id:"SCS", label:"自我关怀量表", en:"Self-Compassion Scale (SCS-SF)", questions:SCS},
  {id:"UCLA", label:"孤独量表", en:"UCLA Loneliness Scale", questions:UCLA},
  {id:"PSS", label:"压力感知量表", en:"Perceived Stress Scale (PSS-10)", questions:PSS},
];

const SCALE = [
  {s:1,zh:"完全不符合",en:"Not at all"},
  {s:2,zh:"不符合",en:"Slightly"},
  {s:3,zh:"较不符合",en:"A little"},
  {s:4,zh:"中立",en:"Neutral"},
  {s:5,zh:"较符合",en:"Quite a bit"},
  {s:6,zh:"符合",en:"Very much"},
  {s:7,zh:"非常符合",en:"Extremely"},
];

const EMOTIONS = [
  {zh:"晨雾",en:"Morning Mist",sub:"弥漫，尚未散去"},
  {zh:"落叶",en:"Fallen Leaf",sub:"有重量，但轻盈"},
  {zh:"暗流",en:"Undercurrent",sub:"表面平静，内里涌动"},
  {zh:"破晓",en:"First Light",sub:"某种东西在松动"},
  {zh:"枯枝",en:"Bare Branch",sub:"干燥，等待什么"},
  {zh:"闷雷",en:"Thunder",sub:"压着，还未爆发"},
  {zh:"苔藓",en:"Moss",sub:"安静地生长着"},
  {zh:"空林",en:"Empty Wood",sub:"什么也没有，很好"},
];

const PURE_QUOTES = [
  {zh:"此刻就是此刻，\n无需成为任何别的东西。",en:"This moment is this moment.\nIt need not become anything else.",author:"—"},
  {zh:"感受本身，\n就是一种知识。",en:"Feeling itself\nis a form of knowledge.",author:"—"},
  {zh:"今天你来了，\n这就够了。",en:"You came today.\nThat is enough.",author:"—"},
  {zh:"情绪没有高下，\n只有深浅。",en:"Emotions have no hierarchy,\nonly depth.",author:"—"},
  {zh:"记录，\n是给未来的自己写信。",en:"Recording\nis writing a letter to your future self.",author:"—"},
  {zh:"每一天，\n都值得被好好经历。",en:"Every day\ndeserves to be fully lived.",author:"—"},
];

const KEY = "innerfield_v2";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)||"null"); } catch { return null; } };
const persist = d => localStorage.setItem(KEY, JSON.stringify(d));
const today = () => new Date().toDateString();
const initState = () => load() || {
  currentBankIdx: 0,
  bankAnswers: {},
  bankReflections: {},
  bankEmotions: {},
  bankReports: {},
  pureLog: [],
  lastDay: null,
  allBanksDone: false,
};

const TW   = "'Courier New','Courier',monospace";
// Huiwen Mincho: classical Ming-style typeface, elegant stroke contrast
const SONG = "'Hiragino Mincho ProN','Hiragino Mincho Pro','YuMincho','Yu Mincho','STSong','SimSun',serif";
const BRUSH= "'Hiragino Mincho ProN','Hiragino Mincho Pro','YuMincho','Yu Mincho','STSong','SimSun',serif";
const INK  = "rgba(38,34,28,.72)";
const INK2 = "rgba(38,34,28,.50)";
const INK3 = "rgba(38,34,28,.30)";
const INK4 = "rgba(38,34,28,.13)";
const PAPER= "#ede5d5";


const Paper = () => (
  <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden"}}>
    {/* Base */}
    <div style={{position:"absolute",inset:0,background:"#ede5d5"}}/>

    {/* Fine grain */}
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" opacity="0.07"/>

      {/* Corner dog-ear folds — irregular diagonal creases near each corner */}
      <g opacity="0.55" fill="none">
        {/* top-left */}
        <line x1="0" y1="52" x2="48" y2="0" stroke="rgba(90,62,24,.18)" strokeWidth="0.8"/>
        <line x1="0" y1="54" x2="50" y2="0" stroke="rgba(230,210,170,.22)" strokeWidth="0.6"/>
        {/* top-right — slightly different angle */}
        <line x1="100%" y1="44" x2="calc(100% - 42px)" y2="0" stroke="rgba(90,62,24,.14)" strokeWidth="0.8"/>
        <line x1="100%" y1="46" x2="calc(100% - 44px)" y2="0" stroke="rgba(230,210,170,.18)" strokeWidth="0.6"/>
        {/* bottom-left */}
        <line x1="0" y1="calc(100% - 60px)" x2="55" y2="100%" stroke="rgba(90,62,24,.12)" strokeWidth="0.7"/>
        <line x1="0" y1="calc(100% - 58px)" x2="57" y2="100%" stroke="rgba(230,210,170,.16)" strokeWidth="0.5"/>
        {/* bottom-right — shorter, more worn */}
        <line x1="100%" y1="calc(100% - 36px)" x2="calc(100% - 34px)" y2="100%" stroke="rgba(90,62,24,.10)" strokeWidth="0.7"/>
        <line x1="100%" y1="calc(100% - 34px)" x2="calc(100% - 36px)" y2="100%" stroke="rgba(230,210,170,.14)" strokeWidth="0.5"/>
      </g>
    </svg>

    {/* Corner darkening */}
    <div style={{position:"absolute",inset:0,background:`
      radial-gradient(ellipse 92% 92% at 50% 50%,
        transparent 58%,
        rgba(80,58,28,.04) 78%,
        rgba(60,42,18,.11) 92%,
        rgba(45,30,10,.18) 100%)
    `}}/>
  </div>
);

export default function App() {
  const [state,   setState]  = useState(initState);
  const [screen,  setScreen] = useState(null);
  const [sel,     setSel]    = useState(null);
  const [em,      setEm]     = useState(null);
  const [note,    setNote]   = useState("");
  const [fade,    setFade]   = useState(true);
  const [report,  setReport] = useState("");
  const [loading, setLoad]   = useState(false);
  const [apiKey,  setApiKey] = useState(localStorage.getItem("hsp_key")||"");
  const [needKey, setNeedKey]= useState(false);
  const textRef = useRef(null);

  const bank     = state.allBanksDone ? null : BANKS[state.currentBankIdx] || null;
  const bAnswers = bank ? (state.bankAnswers[bank.id]||{}) : {};
  const qIdx     = bank ? bank.questions.findIndex((_,i)=>!bAnswers.hasOwnProperty(i)) : -1;
  const q        = (bank && qIdx>=0) ? bank.questions[qIdx] : null;
  const bProgress= Object.keys(bAnswers).length;
  const bTotal   = bank ? bank.questions.length : 0;

  useEffect(()=>{
    if (state.allBanksDone) { setScreen("pure"); return; }
    if (!bank) { setScreen("pure"); return; }
    if (bProgress >= bTotal) {
      const rep = state.bankReports[bank.id];
      if (rep) { setReport(rep); setScreen("report"); }
      else { setScreen("report"); doReport(state, bank); }
      return;
    }
    if (state.lastDay===today()) { setScreen("rest"); return; }
    setScreen("q");
  },[]);

  const go = s => { setFade(false); setTimeout(()=>{ setScreen(s); setFade(true); },230); };

  // DEV: skip to report — remove before real launch
  const devSkipToReport = () => {
    const bk = BANKS[0];
    const fakeAnswers = Object.fromEntries(bk.questions.map((_,i)=>[i,4]));
    const ns = {...state, bankAnswers:{...state.bankAnswers,[bk.id]:fakeAnswers}, currentBankIdx:0};
    setState(ns); persist(ns); setScreen("report");
    setTimeout(()=>doReport(ns, bk), 300);
  };

  const BUILTIN_KEY = "sk-eLecbtKDKvnlLsV2NKHfAH7SMiakbNyKeHOpLSHr0O07LpyH"; // 替换成你自己的key
  const isFirstBank = (bk) => bk.id === "HSP";

  const doReport = async (st, bk) => {
    setLoad(true);
    // First bank: use built-in key. Others: require user key.
    const key = isFirstBank(bk)
      ? BUILTIN_KEY
      : (localStorage.getItem("hsp_key") || apiKey);
    if (!isFirstBank(bk) && !key){ setLoad(false); setNeedKey(true); return; }
    const ans = st.bankAnswers[bk.id]||{};
    const ref = st.bankReflections[bk.id]||{};
    const emo = st.bankEmotions[bk.id]||{};
    const score = Object.values(ans).reduce((a,b)=>a+b,0);
    const max = bk.questions.length*7;
    const pct = Math.round(score/max*100);
    const journal = Object.entries(ref).filter(([,v])=>v)
      .map(([k,v])=>`第${+k+1}题：[${emo[k]||"—"}] ${v}`).join("\n");
    const prompt = `你是一位专业且富有温度的心理分析师。
用户用${bk.questions.length}天完成了${bk.label}（${bk.en}），7分制。
总分：${score}/${max}（${pct}%）
逐题得分：
${bk.questions.map((q,i)=>`${i+1}. ${q.zh} → ${ans[i]||0}`).join("\n")}
用户每日情绪意象与记录：
${journal||"（无文字记录）"}
请生成深度分析报告，中文，有文学质感，如同一封信：
**你是谁**
**你的礼物**
**你的挑战**
**关于你的记录**
**亲爱的你**（以此开头作为结尾）`;
    try {
      const res = await fetch("https://api.aiclaude.xyz/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:2000,messages:[{role:"user",content:prompt}]}),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text||"生成失败，请检查 API Key。";
      const ns = {...st, bankReports:{...st.bankReports,[bk.id]:text}};
      setState(ns); persist(ns); setReport(text);
    } catch { setReport("网络错误，请稍后重试。"); }
    setLoad(false);
  };

  const handleContinue = () => { if(!sel) return; go("r"); setTimeout(()=>textRef.current?.focus(),380); };

  const handleSave = () => {
    const id = bank.id;
    const na = {...(state.bankAnswers[id]||{}), [qIdx]:sel};
    const nr = {...(state.bankReflections[id]||{}), [qIdx]:note};
    const ne = {...(state.bankEmotions[id]||{}), [qIdx]:em?.zh||""};
    const ns = {...state, bankAnswers:{...state.bankAnswers,[id]:na}, bankReflections:{...state.bankReflections,[id]:nr}, bankEmotions:{...state.bankEmotions,[id]:ne}, lastDay:today()};
    setState(ns); persist(ns); setSel(null); setEm(null); setNote("");
    if (Object.keys(na).length>=bTotal){ go("report"); setTimeout(()=>doReport(ns,bank),300); }
    else go("rest");
  };

  const handleNextBank = () => {
    const next = state.currentBankIdx+1;
    const done = next>=BANKS.length;
    const ns = {...state, currentBankIdx:next, allBanksDone:done, lastDay:null};
    setState(ns); persist(ns);
    if (done) go("pure"); else { setSel(null); setEm(null); setNote(""); go("q"); }
  };

  const handleSavePure = () => {
    const ns = {...state, pureLog:[...state.pureLog,{date:today(),emotion:em?.zh||"",note}], lastDay:today()};
    setState(ns); persist(ns); setEm(null); setNote(""); go("rest");
  };

  // Shared style helpers
  const FW = 700; // font weight for all main text
  const Rule  = ({my=20})=><div style={{height:1,background:INK,opacity:.35,margin:`${my}px 0`}}/>;
  const TRule = ({my=14})=><div style={{height:1,background:INK4,margin:`${my}px 0`}}/>;
  const Label = ({t,style={}})=><div style={{fontFamily:TW,fontSize:10,letterSpacing:3,color:INK2,textTransform:"uppercase",fontWeight:FW,...style}}>{t}</div>;
  const Btn = ({label,onClick,disabled=false,ghost=false})=>(
    <button onClick={onClick} disabled={disabled} style={{
      width:"100%",padding:"13px 0",
      background:ghost?"transparent":(disabled?"transparent":INK),
      border:`1px solid ${disabled?INK4:INK}`,
      color:ghost?INK2:(disabled?INK3:PAPER),
      fontFamily:TW,fontSize:11,letterSpacing:3,fontWeight:FW,
      cursor:disabled?"not-allowed":"pointer",
      borderRadius:1,textTransform:"uppercase",transition:"all .18s",
    }}>{label}</button>
  );
  const W = (extra={})=>({
    position:"relative",zIndex:10,minHeight:"100vh",
    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    padding:"40px 20px",opacity:fade?1:0,transition:"opacity .23s ease",
    fontFamily:SONG,...extra,
  });

  // ── REST ──
  if (screen==="rest") {
    const nextQ = (bank && qIdx>=0) ? bank.questions[qIdx] : null;
    return (
      <>
          <Paper/>
        <div style={W()}>
          <div style={{maxWidth:420,width:"100%",textAlign:"center"}}>
            {bank && <div style={{fontFamily:TW,fontSize:32,color:INK,letterSpacing:"0.05em",lineHeight:1,marginBottom:20,fontWeight:700}}>{String(bProgress).padStart(2,"0")}<span style={{fontSize:14,letterSpacing:1,color:INK2}}> / {String(bTotal).padStart(2,"0")}</span></div>}
            <Rule my={14}/>
            <p style={{fontFamily:BRUSH,fontSize:18,color:INK,lineHeight:1.9,margin:"0 0 6px",fontWeight:"normal"}}>今天的记录已封存。</p>
            <p style={{fontFamily:TW,fontSize:11,color:INK2,letterSpacing:2,margin:"0 0 28px",fontWeight:FW}}>Today's entry is sealed.</p>
            <TRule my={22}/>
            {nextQ ? (
              <>
                <p style={{fontFamily:BRUSH,fontSize:16,color:INK,lineHeight:1.85,margin:"0 0 8px",fontWeight:"normal",whiteSpace:"pre-line"}}>{nextQ.quote.zh}</p>
                <p style={{fontFamily:TW,fontSize:10,color:INK2,letterSpacing:.5,whiteSpace:"pre-line",marginBottom:8,fontWeight:FW}}>{nextQ.quote.en}</p>
                <p style={{fontFamily:TW,fontSize:9,color:INK3,letterSpacing:2,fontWeight:FW}}>— {nextQ.quote.author}</p>
              </>
            ) : <p style={{fontFamily:SONG,fontSize:14,color:INK2,fontStyle:"italic",fontWeight:FW}}>明天继续。</p>}
            {bank && <p style={{fontFamily:TW,fontSize:9,color:INK3,letterSpacing:2,marginTop:24,fontWeight:FW}}>{bTotal-bProgress} questions remain · {bank.en}</p>}
          </div>
        </div>
      </>
    );
  }

  // ── QUESTION ──
  if (screen==="q" && q && bank) return (
    <>
      <Paper/>
      <div style={W()}>
        <div style={{maxWidth:460,width:"100%"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}>
            <div>
              <Label t={`${bank.id} · ${bank.en}`}/>
              <div style={{fontFamily:SONG,fontSize:11,color:INK3,marginTop:3,fontWeight:FW}}>{bank.label}</div>
            </div>
            <div style={{fontFamily:TW,fontSize:32,color:INK,letterSpacing:"0.05em",lineHeight:1,fontWeight:700}}>{String(qIdx+1).padStart(2,"0")}</div>
          </div>
          <Rule my={0}/>
          <div style={{margin:"22px 0 26px"}}>
            <p style={{fontFamily:SONG,fontSize:"clamp(17px,4.5vw,22px)",color:INK,lineHeight:1.9,margin:"0 0 8px",fontWeight:"normal",letterSpacing:"0.04em"}}>{q.zh}</p>
            <p style={{fontFamily:TW,fontSize:11,color:INK2,margin:0,lineHeight:1.6,letterSpacing:.5,fontWeight:FW}}>{q.en}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:26}}>
            {SCALE.map(({s,zh,en})=>{
              const active=sel===s;
              return (
                <button key={s} onClick={()=>setSel(s)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 13px",background:active?"rgba(38,34,28,.08)":"transparent",border:`1px solid ${active?"rgba(38,34,28,.40)":INK4}`,borderRadius:1,cursor:"pointer",transition:"all .14s",textAlign:"left"}}>
                  <span style={{fontFamily:TW,fontSize:11,color:active?INK:INK3,width:14,flexShrink:0,fontWeight:FW}}>{s}</span>
                  <span style={{fontFamily:SONG,fontSize:14,color:active?INK:INK2,flex:1,fontWeight:"normal"}}>{zh}</span>
                  <span style={{fontFamily:TW,fontSize:10,color:active?INK2:INK3,letterSpacing:.3,fontWeight:FW}}>{en}</span>
                  {active&&<div style={{width:5,height:5,borderRadius:"50%",background:INK,flexShrink:0}}/>}
                </button>
              );
            })}
          </div>
          <div style={{height:1,background:INK4,marginBottom:5,position:"relative"}}>
            <div style={{position:"absolute",top:0,left:0,height:"100%",width:`${(bProgress/bTotal)*100}%`,background:INK,transition:"width .5s"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:22}}>
            <span style={{fontFamily:TW,fontSize:8,color:INK3,letterSpacing:2,fontWeight:FW}}>DAY {bProgress+1}</span>
            <span style={{fontFamily:TW,fontSize:8,color:INK3,fontWeight:FW}}>{bProgress} / {bTotal} complete</span>
          </div>
          <Btn label={sel?"Continue →":"Select an answer"} onClick={handleContinue} disabled={!sel}/>
          <div style={{marginTop:24,textAlign:"center"}}>
            <button onClick={devSkipToReport} style={{background:"none",border:"none",fontFamily:TW,fontSize:8,color:INK4,letterSpacing:2,cursor:"pointer",textTransform:"uppercase"}}>dev: skip to report</button>
          </div>
        </div>
      </div>
    </>
  );

  // ── REFLECT ──
  if (screen==="r" && q) return (
    <>
      <Paper/>
      <div style={W({justifyContent:"flex-start",paddingTop:44,paddingBottom:52})}>
        <div style={{maxWidth:460,width:"100%"}}>
          <Label t="一句值得驻留的话 · A line to dwell on"/>
          <Rule my={16}/>
          <p style={{fontFamily:BRUSH,fontSize:"clamp(19px,5vw,26px)",color:INK,lineHeight:1.78,margin:"0 0 14px",whiteSpace:"pre-line",fontWeight:"normal",fontStyle:"italic"}}>{q.quote.zh}</p>
          <p style={{fontFamily:TW,fontSize:11,color:INK2,lineHeight:1.65,margin:"0 0 12px",whiteSpace:"pre-line",letterSpacing:.4,fontWeight:FW}}>{q.quote.en}</p>
          <div style={{fontFamily:TW,fontSize:10,color:INK3,letterSpacing:2,fontWeight:FW}}>— {q.quote.author}</div>
          <TRule my={26}/>
          <Label t="此刻你像 · How you feel now"/>
          <div style={{fontFamily:SONG,fontSize:12,color:INK3,fontStyle:"italic",margin:"8px 0 14px",fontWeight:FW}}>选一个意象，不必精确</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:26}}>
            {EMOTIONS.map(e=>{
              const active=em?.zh===e.zh;
              return (
                <button key={e.zh} onClick={()=>setEm(e)} style={{padding:"12px 6px",textAlign:"center",background:active?"rgba(38,34,28,.08)":"transparent",border:`1px solid ${active?"rgba(38,34,28,.42)":INK4}`,borderRadius:1,cursor:"pointer",transition:"all .14s"}}>
                  <div style={{fontFamily:SONG,fontSize:14,color:active?INK:INK2,marginBottom:3,fontWeight:"normal",letterSpacing:"0.03em"}}>{e.zh}</div>
                  <div style={{fontFamily:TW,fontSize:7,color:active?INK2:INK3,letterSpacing:.5,textTransform:"uppercase",lineHeight:1.3,fontWeight:FW}}>{e.en}</div>
                </button>
              );
            })}
          </div>
          <TRule my={0}/>
          <div style={{margin:"20px 0 12px"}}>
            <Label t="留下什么 · Leave a trace"/>
            <div style={{fontFamily:SONG,fontSize:12,color:INK3,fontStyle:"italic",margin:"8px 0 12px",fontWeight:FW}}>一句话，一个画面，或者沉默</div>
          </div>
          <textarea ref={textRef} value={note} onChange={e=>setNote(e.target.value)} placeholder="此刻涌现的……"
            style={{width:"100%",minHeight:80,padding:"12px 14px",boxSizing:"border-box",background:"rgba(38,34,28,.04)",border:`1px solid ${INK4}`,borderRadius:1,color:INK,fontSize:14,lineHeight:1.8,resize:"none",outline:"none",fontFamily:SONG,fontStyle:"italic",marginBottom:22,fontWeight:FW}}
          />
          <Btn label={bProgress+1>=bTotal?"Seal & Reveal →":"封存此刻  Seal & Rest →"} onClick={handleSave}/>
          <div style={{marginTop:12,textAlign:"center",fontFamily:TW,fontSize:9,color:INK3,letterSpacing:2,fontWeight:FW}}>{bTotal-bProgress-1} questions remaining after today</div>
        </div>
      </div>
    </>
  );

  // ── REPORT ──
  if (screen==="report") return (
    <>
      <Paper/>
      <div style={W({justifyContent:"flex-start",paddingTop:44,paddingBottom:64})}>
        <div style={{maxWidth:500,width:"100%"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}>
            <div>
              <Label t={`${bank?.en||"Portrait"} · 内心图景`}/>
              <div style={{fontFamily:TW,fontSize:9,color:INK3,marginTop:3,letterSpacing:2,fontWeight:FW}}>{bank?.label} · Complete</div>
            </div>
            <div style={{fontFamily:TW,fontSize:26,color:INK,lineHeight:1,letterSpacing:"0.04em",fontWeight:700}}>
              {Object.values(state.bankAnswers[bank?.id]||{}).reduce((a,b)=>a+b,0)}
              <span style={{fontSize:11,color:INK3,letterSpacing:1}}>/{bTotal*7}</span>
            </div>
          </div>
          <Rule my={0}/>
          {needKey?(
            <div style={{marginTop:24}}>
              <p style={{fontFamily:SONG,fontSize:18,color:INK,lineHeight:1.6,marginBottom:8,fontStyle:"italic"}}>Oops! 需要自掏 API 了哟～</p>
              <TRule my={16}/>
              <p style={{fontFamily:SONG,fontSize:13,color:INK,lineHeight:1.95,marginBottom:6}}>
                <strong style={{fontFamily:TW,fontSize:10,letterSpacing:2,color:INK2}}>API KEY 是什么？</strong>
              </p>
              <p style={{fontFamily:SONG,fontSize:13,color:INK2,lineHeight:1.95,marginBottom:20}}>
                API Key 是一串密码，用来告诉 AI 服务"这个请求是你发的"。每次生成报告，AI 会读取你 27 天的答题记录和心情日记，写一份专属于你的分析。这个过程需要调用 AI 接口，费用大约几毛钱人民币，从你自己的账户扣。
              </p>
              <p style={{fontFamily:SONG,fontSize:13,color:INK,lineHeight:1.95,marginBottom:6}}>
                <strong style={{fontFamily:TW,fontSize:10,letterSpacing:2,color:INK2}}>去哪里拿？</strong>
              </p>
              <div style={{fontFamily:SONG,fontSize:13,color:INK2,lineHeight:2,marginBottom:20}}>
                <div>· <strong style={{color:INK}}>Claude（推荐）</strong> — console.anthropic.com，国内需要梯子</div>
                <div>· <strong style={{color:INK}}>DeepSeek</strong> — platform.deepseek.com，国内可直接访问，价格便宜</div>
                <div>· <strong style={{color:INK}}>中转服务</strong> — api.aiclaude.xyz 等，支持支付宝充值</div>
              </div>
              <p style={{fontFamily:SONG,fontSize:12,color:INK3,lineHeight:1.8,marginBottom:20,fontStyle:"italic"}}>
                拿到 Key 后粘贴到下方，只存在你自己的浏览器里，我们不会看到。
              </p>
              <input value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="sk-..."
                style={{width:"100%",padding:"11px 14px",boxSizing:"border-box",background:"rgba(38,34,28,.05)",border:`1px solid ${INK4}`,borderRadius:1,color:INK,fontSize:13,outline:"none",fontFamily:TW,marginBottom:14,fontWeight:FW}}
              />
              <Btn label="Generate Report →" onClick={()=>{localStorage.setItem("hsp_key",apiKey);setNeedKey(false);doReport(state,bank);}}/>
            </div>
          ):loading?(
            <div style={{textAlign:"center",padding:"52px 0"}}>
              <div style={{fontFamily:TW,fontSize:22,color:INK3,letterSpacing:6,marginBottom:18,animation:"blink 1.4s infinite",fontWeight:FW}}>· · ·</div>
              <p style={{fontFamily:BRUSH,fontSize:15,color:INK2,lineHeight:1.9,fontWeight:"normal"}}>正在阅读你留下的痕迹</p>
              <p style={{fontFamily:TW,fontSize:10,color:INK3,letterSpacing:3,marginTop:8,fontWeight:FW}}>reading your traces</p>
              <style>{`@keyframes blink{0%,100%{opacity:.15}50%{opacity:.65}}`}</style>
            </div>
          ):(
            <div style={{marginTop:24}}>
              <div style={{marginBottom:28}}>
                <div style={{height:1,background:INK4,position:"relative",marginBottom:5}}>
                  <div style={{position:"absolute",top:0,left:0,height:"100%",width:`${(Object.values(state.bankAnswers[bank?.id]||{}).reduce((a,b)=>a+b,0)/(bTotal*7))*100}%`,background:INK}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontFamily:TW,fontSize:8,color:INK3,letterSpacing:2,fontWeight:FW}}>LOW</span>
                  <span style={{fontFamily:TW,fontSize:8,color:INK3,letterSpacing:2,fontWeight:FW}}>HIGH</span>
                </div>
              </div>
              <div style={{fontFamily:SONG,fontSize:14,color:INK,lineHeight:2.1,letterSpacing:"0.04em",fontWeight:"normal"}}>
                {report.split(/(\*\*[^*]+\*\*)/).map((part,i)=>
                  part.startsWith("**")&&part.endsWith("**")
                    ?<div key={i} style={{fontFamily:TW,fontSize:10,letterSpacing:3,color:INK2,textTransform:"uppercase",marginTop:28,marginBottom:8,fontWeight:FW}}>{part.slice(2,-2)}</div>
                    :<span key={i}>{part}</span>
                )}
              </div>
              <TRule my={32}/>
              <Btn label={`Next: ${BANKS[state.currentBankIdx+1]?.id||"Pure Record"} →`} onClick={handleNextBank}/>
              <div style={{height:8}}/>
              <Btn ghost label="Start Over · 重新开始" onClick={()=>{if(window.confirm("重置所有记录？")){localStorage.removeItem(KEY);setState(initState());setScreen("q");}}}/>
            </div>
          )}
        </div>
      </div>
    </>
  );

  // ── PURE EMOTION ──
  if (screen==="pure") {
    const doneTdy = state.lastDay===today();
    const rq = PURE_QUOTES[Math.floor(Date.now()/86400000)%PURE_QUOTES.length];
    if (doneTdy) return (
      <>
          <Paper/>
        <div style={W()}>
          <div style={{maxWidth:420,width:"100%",textAlign:"center"}}>
            <Label t="Pure Record · 纯粹记录" style={{display:"block",textAlign:"center",marginBottom:18}}/>
            <Rule my={0}/>
            <div style={{height:16}}/>
            <p style={{fontFamily:BRUSH,fontSize:17,color:INK,lineHeight:1.9,fontWeight:"normal"}}>今天的心情已记录。</p>
            <p style={{fontFamily:TW,fontSize:11,color:INK2,letterSpacing:2,marginBottom:28,fontWeight:FW}}>See you tomorrow.</p>
            <TRule my={22}/>
            <p style={{fontFamily:BRUSH,fontSize:16,color:INK,lineHeight:1.9,fontWeight:"normal",whiteSpace:"pre-line"}}>{rq.zh}</p>
            <p style={{fontFamily:TW,fontSize:9,color:INK2,letterSpacing:1,marginTop:8,whiteSpace:"pre-line",fontWeight:FW}}>{rq.en}</p>
            <p style={{fontFamily:TW,fontSize:9,color:INK3,letterSpacing:2,marginTop:6,fontWeight:FW}}>— {rq.author}</p>
          </div>
        </div>
      </>
    );
    return (
      <>
          <Paper/>
        <div style={W({justifyContent:"flex-start",paddingTop:44,paddingBottom:52})}>
          <div style={{maxWidth:460,width:"100%"}}>
            <Label t="Pure Record · 纯粹记录"/>
            <Rule my={16}/>
            <p style={{fontFamily:BRUSH,fontSize:16,color:INK,lineHeight:1.9,margin:"0 0 8px",fontWeight:"normal",whiteSpace:"pre-line"}}>{rq.zh}</p>
            <p style={{fontFamily:TW,fontSize:10,color:INK2,letterSpacing:.5,margin:"0 0 4px",whiteSpace:"pre-line",fontWeight:FW}}>{rq.en}</p>
            <p style={{fontFamily:TW,fontSize:9,color:INK3,letterSpacing:2,marginBottom:28,fontWeight:FW}}>— {rq.author}</p>
            <TRule my={0}/>
            <div style={{margin:"20px 0 14px"}}>
              <Label t="此刻你像 · How you feel"/>
              <div style={{fontFamily:SONG,fontSize:12,color:INK3,fontStyle:"italic",marginTop:8,fontWeight:FW}}>所有题库已完成，今后只记录心情</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:26}}>
              {EMOTIONS.map(e=>{
                const active=em?.zh===e.zh;
                return (
                  <button key={e.zh} onClick={()=>setEm(e)} style={{padding:"12px 6px",textAlign:"center",background:active?"rgba(38,34,28,.08)":"transparent",border:`1px solid ${active?"rgba(38,34,28,.42)":INK4}`,borderRadius:1,cursor:"pointer",transition:"all .14s"}}>
                    <div style={{fontFamily:SONG,fontSize:14,color:active?INK:INK2,marginBottom:3,fontWeight:"normal",letterSpacing:"0.03em"}}>{e.zh}</div>
                    <div style={{fontFamily:TW,fontSize:7,color:active?INK2:INK3,letterSpacing:.5,textTransform:"uppercase",lineHeight:1.3,fontWeight:FW}}>{e.en}</div>
                  </button>
                );
              })}
            </div>
            <TRule my={0}/>
            <div style={{margin:"20px 0 12px"}}>
              <Label t="留下什么 · Leave a trace"/>
              <div style={{fontFamily:SONG,fontSize:12,color:INK3,fontStyle:"italic",margin:"8px 0 12px",fontWeight:FW}}>一句话，一个画面，或者沉默</div>
            </div>
            <textarea value={note} onChange={e=>setNote(e.target.value)} ref={textRef} placeholder="此刻涌现的……"
              style={{width:"100%",minHeight:80,padding:"12px 14px",boxSizing:"border-box",background:"rgba(38,34,28,.04)",border:`1px solid ${INK4}`,borderRadius:1,color:INK,fontSize:14,lineHeight:1.8,resize:"none",outline:"none",fontFamily:SONG,fontStyle:"italic",marginBottom:22,fontWeight:FW}}
            />
            <Btn label="封存此刻  Seal & Rest →" onClick={handleSavePure}/>
          </div>
        </div>
      </>
    );
  }

  return <Paper/>;
}
