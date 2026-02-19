# 🎲 Poker Equity & Odds Quick Reference
## Instant Calculations for In-Game Decisions

---

## Table of Contents
1. [Pre-Flop Equity](#pre-flop-equity)
2. [Common Draw Probabilities](#draw-probabilities)
3. [Pot Odds Chart](#pot-odds)
4. [Expected Value Calculations](#ev-calculations)
5. [Implied Odds](#implied-odds)
6. [All-In Equity](#all-in-equity)

---

## Pre-Flop Equity

### Premium Hands vs Random Hand
| Hand | Equity vs Random |
|------|------------------|
| AA | 85% |
| KK | 82% |
| QQ | 80% |
| JJ | 77% |
| TT | 75% |
| 99 | 72% |
| 88 | 69% |
| 77 | 66% |
| AKs | 67% |
| AKo | 65% |
| AQs | 66% |
| AQo | 64% |

### Common Pre-Flop Match-Ups

**Overpair vs Underpair:**
- QQ vs 99: **82% vs 18%**
- AA vs 22: **82% vs 18%**

**Overpair vs Two Overcards:**
- JJ vs AK: **55% vs 45%** (coin flip)
- 99 vs AQ: **54% vs 46%**
- TT vs KQ: **57% vs 43%**

**Pair vs One Overcard:**
- 99 vs AJ: **69% vs 31%**
- 77 vs KQ: **54% vs 46%**

**Two Overcards vs Two Undercards:**
- AK vs QJ: **63% vs 37%**
- AQ vs JT: **64% vs 36%**

**Suited vs Offsuit (Same Ranks):**
- AKs vs AKo: **~3% equity difference**
- Being suited adds ~2-3% equity

**Domination Scenarios:**
- AK vs AQ: **73% vs 27%** (dominated)
- KK vs KQ: **91% vs 9%** (heavily dominated)
- AA vs AK: **93% vs 7%** (extremely dominated)

**Connector Battle:**
- JTs vs 76s: **60% vs 40%**
- 98s vs 54s: **63% vs 37%**

---

## Common Draw Probabilities

### Outs to Equity Conversion

**Rule of 4 and 2:**
- **Flop to River:** Outs x 4 ≈ Equity %
- **Turn to River:** Outs x 2 ≈ Equity %

### Outs Table

| Draw Type | Outs | Flop→River % | Turn→River % |
|-----------|------|--------------|--------------|
| Gutshot (inside straight) | 4 | 16.5% | 8.7% |
| Two Overcards | 6 | 24.1% | 12.8% |
| Open-Ended Straight | 8 | 31.5% | 17.0% |
| Flush Draw | 9 | 35.0% | 19.1% |
| Flush + Gutshot | 12 | 45.0% | 25.5% |
| Flush + Open-Ender | 15 | 54.1% | 31.9% |
| Flush + Pair | 12-14 | 45-52% | 26-30% |

### Specific Draw Examples

**Flush Draw (9 Outs):**
- Flop: You have **35%** to make flush by river
- Turn: You have **19.1%** to make flush on river

**Open-Ended Straight Draw (8 Outs):**
- Flop: You have **31.5%** to make straight by river
- Turn: You have **17%** to make straight on river

**Gutshot Straight Draw (4 Outs):**
- Flop: You have **16.5%** to make straight by river
- Turn: You have **8.7%** to make straight on river

**Combo Draw - Flush + Open-Ender (15 Outs):**
- Flop: You have **54.1%** to make straight/flush by river
- Turn: You have **31.9%** to make straight/flush on river

**Overcard + Gutshot (7 Outs):**
- Flop: You have **27.8%** to improve by river
- Turn: You have **14.9%** to improve on river

---

## Pot Odds Chart

### Converting Bet Size to Required Equity

**Formula:** Required Equity = Call / (Pot + Bet + Call)

| Bet Size | Pot Odds | Required Equity |
|----------|----------|-----------------|
| 25% pot | 5:1 | 16.7% |
| 33% pot | 4:1 | 20.0% |
| 50% pot | 3:1 | 25.0% |
| 66% pot | 2.5:1 | 28.6% |
| 75% pot | 2.3:1 | 30.0% |
| 100% pot (pot-sized) | 2:1 | 33.3% |
| 150% pot | 1.7:1 | 37.5% |
| 200% pot | 1.5:1 | 40.0% |

### Quick Decision Table: Call or Fold?

**Example:** Pot = $100, Opponent bets $50, You have flush draw (9 outs = 35% equity)

- Required Equity = 50/(100+50+50) = 25%
- **You have 35%, required 25% → CALL**

**Example 2:** Pot = $100, Opponent bets $100, You have gutshot (4 outs = 16.5% equity)

- Required Equity = 100/(100+100+100) = 33.3%
- **You have 16.5%, required 33.3% → FOLD**

---

## Expected Value (EV) Calculations

### Formula
**EV = (Probability of Win × Amount Won) - (Probability of Loss × Amount Lost)**

### EV Examples

**Example 1: Flush Draw Call**
- Pot = $100
- Opponent bets $50
- You call $50 with flush draw (35% to hit by river)

EV = (0.35 × $150) - (0.65 × $50)
EV = $52.50 - $32.50 = **+$20 EV**

**Decision: CALL** (profitable long-term)

**Example 2: Gutshot Draw Call**
- Pot = $100
- Opponent bets $75
- You call $75 with gutshot (16.5% to hit by river)

EV = (0.165 × $175) - (0.835 × $75)
EV = $28.88 - $62.63 = **-$33.75 EV**

**Decision: FOLD** (losing long-term)

**Example 3: Semi-Bluff Raise**
- Pot = $100
- Opponent bets $50
- You raise to $150 with flush draw
- Opponent folds 40% of the time
- When called, you win 35% of the time

EV = (0.40 × $150) + (0.60 × 0.35 × $300) - (0.60 × 0.65 × $150)
EV = $60 + $63 - $58.50 = **+$64.50 EV**

**Decision: RAISE** (very profitable)

---

## Implied Odds

### What Are Implied Odds?
**Definition:** Additional money you can win on future streets if you hit your draw

### When Implied Odds Matter Most
1. **Deep Stacks:** More money behind to win
2. **Hidden Draws:** Opponent won't see it coming (flush, straight)
3. **Aggressive Opponents:** They'll pay you off when you hit
4. **Multiway Pots:** More players = more potential money

### Calculating Implied Odds

**Direct Pot Odds Insufficient:**
- Pot = $50
- Call = $50
- Gutshot = 4 outs (~17%)
- Required Equity = 50/(50+50+50) = 33%

**Direct odds say FOLD. But:**

**If you can win $200 more when you hit:**
- Total win = $50 (current pot) + $50 (their bet) + $50 (your call) + $200 (future bets)
- Total risk = $50
- Effective odds = 50:350 = 1:7
- Required equity = ~12.5%

**You have 17%, required 12.5% → CALL** (implied odds make it profitable)

### Reverse Implied Odds
**Definition:** Money you'll LOSE on future streets when you hit but are beaten

**Example:**
- You have Q♥T♥, flop is K♥9♥2♣
- Opponent has A♥8♥ (bigger flush draw)
- You hit flush → you STILL LOSE and might lose more money

**When to worry about reverse implied odds:**
1. Drawing to non-nut hands (lower flush, weak straight)
2. Top pair weak kicker vs aggressive opponent
3. Second-best full house potential

---

## All-In Equity (Common Match-Ups)

### Pocket Pairs vs Overcards

| Match-Up | Pair Equity | Overcards Equity |
|----------|-------------|------------------|
| QQ vs AK | 57% | 43% |
| JJ vs AQ | 55% | 45% |
| TT vs KQ | 57% | 43% |
| 99 vs AJ | 69% | 31% |
| 88 vs KJ | 69% | 31% |
| 77 vs QJ | 54% | 46% |
| 66 vs AT | 54% | 46% |

**Key Insight:** Medium pairs are ~55% favorites vs two overcards (classic coin flip)

### Overpair vs Underpair

| Match-Up | Overpair | Underpair |
|----------|----------|-----------|
| AA vs KK | 82% | 18% |
| KK vs QQ | 82% | 18% |
| QQ vs JJ | 82% | 18% |
| JJ vs TT | 82% | 18% |
| TT vs 99 | 82% | 18% |

**Key Insight:** Overpair is ~82% favorite (4.5:1)

### Dominated Hands

| Match-Up | Favorite | Underdog |
|----------|----------|----------|
| AA vs AK | 93% | 7% |
| KK vs KQ | 91% | 9% |
| AK vs AQ | 73% | 27% |
| AQ vs AJ | 71% | 29% |
| KQ vs KJ | 71% | 29% |

**Key Insight:** Dominated = 70-90% underdog (avoid these spots!)

### Suited vs Offsuit (Same Ranks)

| Match-Up | Suited | Offsuit |
|----------|--------|---------|
| AKs vs AKo | 51.5% | 48.5% |
| AQs vs AQo | 51.5% | 48.5% |
| KQs vs KQo | 52% | 48% |

**Key Insight:** Suited is only ~2-3% better

---

## Quick Reference: Breakeven Percentages

### How Often Do You Need to Win?

| Pot Odds | Breakeven % |
|----------|-------------|
| 10:1 | 9.1% |
| 9:1 | 10% |
| 8:1 | 11.1% |
| 7:1 | 12.5% |
| 6:1 | 14.3% |
| 5:1 | 16.7% |
| 4:1 | 20% |
| 3:1 | 25% |
| 2:1 | 33.3% |
| 3:2 | 40% |
| 1:1 | 50% |

### Bluffing Breakeven

**How often must opponent fold for bluff to be profitable?**

**Formula:** Required Fold % = Bet / (Bet + Pot)

| Bet Size | Required Fold % |
|----------|-----------------|
| 25% pot | 20% |
| 33% pot | 25% |
| 50% pot | 33% |
| 66% pot | 40% |
| 100% pot | 50% |
| 150% pot | 60% |
| 200% pot | 67% |

**Example:** You bet pot-sized ($100 into $100), opponent must fold **50%** of the time for bluff to break even.

---

## Multi-Street Equity

### Running It Twice (Common in Cash Games)

**Purpose:** Reduce variance by dealing remaining cards twice

**Example:** You have 35% equity
- Run once: 35% to win full pot
- Run twice: ~35% to win half pot each time (reduces swings)

**When to agree:**
- Big all-ins
- Want to reduce variance
- Both players agree

---

## ICM Considerations (Tournaments)

### Chip Value Changes Based on Stack Sizes

**Early Tournament:**
- Chips = linear value
- Play normal ranges

**Bubble:**
- Chips worth LESS (losing hurts more than winning helps)
- Play tighter, avoid marginal spots

**Final Table:**
- Ladder positions matter
- Adjust based on opponents' stacks

**Example:**
- You have AA, get it in vs KK pre-flop = +EV in cash game
- On the bubble with medium stack? Might be -$EV due to ICM

---

## Hand Reading: Narrowing Ranges

### Pre-Flop Range Narrowing

**UTG Raise → Likely:** AA-TT, AK, AQ
**BTN Raise → Likely:** Any pair, suited connectors, broadways, suited aces

**UTG 3-Bet → Likely:** AA-QQ, AK
**BTN 3-Bet → Likely:** AA-99, AK, AQ, suited Broadway, bluffs

### Post-Flop Range Narrowing

**Flop: K-7-2 rainbow**
- **Pre-flop raiser range:** AK, KQ, KJ, KT, overpairs, air c-bets
- **Caller range:** Kx, pocket pairs, suited connectors, draws

**Flop: 9♠8♠7♣**
- **Pre-flop raiser range:** Overpairs, draws, some Kx/Ax, total air
- **Caller range:** Sets, two-pair, straight draws, flush draws, pairs

### Turn/River Texture Changes

**Turn brings flush:**
- Raiser now has more flush combos (was betting AKs, AQs, etc.)
- Caller has more flush combos (suited connectors, suited aces)

**River pairs board:**
- Full houses now possible
- Medium-strength hands devalued

---

## Practical Application: Live Hand Example

**Situation:**
- You: A♠K♠ in CO
- Villain: Unknown in BB
- Pre-flop: You raise $10, BB calls
- Flop: Q♠9♠2♣ (pot = $22)
- Villain checks, you c-bet $15, Villain calls
- Turn: 5♦ (pot = $52)
- Villain checks

**Your Equity:**
- Nut flush draw: 9 outs
- Overcards: 6 outs (assume 3 outs to avoid double-counting)
- **Total: ~12 outs = 45-48% equity**

**Decision:**
1. Bet for value/semi-bluff (you have tons of equity)
2. Size: $35-40 (65-75% pot)
3. If raised: Call (getting great price with massive equity)
4. If called: Barrel river if you hit, check-fold if you miss

**EV Calculation if you bet $40:**
- Villain folds 30%: Win $52
- Villain calls 70%, you hit 48%: Win $132
- Villain calls 70%, you miss 52%: Lose $40

EV = (0.30 × $52) + (0.70 × 0.48 × $132) - (0.70 × 0.52 × $40)
EV = $15.60 + $44.35 - $14.56 = **+$45.39**

**MASSIVELY +EV → BET TURN!**

---

## Summary: Key Takeaways

1. **Know your outs** → Convert to equity with Rule of 4/2
2. **Compare equity to pot odds** → Call if equity > required%
3. **Factor in implied odds** with deep stacks/hidden draws
4. **Avoid dominated situations** (you're 70-90% to lose)
5. **Understand position** changes equity realization
6. **Adjust for stack sizes** (shallow = push/fold, deep = more speculative)

🎲 **Math doesn't lie. Trust the numbers and print money long-term!**
