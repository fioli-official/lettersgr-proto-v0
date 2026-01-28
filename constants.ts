
import { GreekLetter, LevelGroup } from './types';

export interface GreekLetterExtended extends GreekLetter {
  pronunciationNote?: string;
  ipa: string;
}

/**
 * Verified IPA Phoneme Audio Sources for Modern Greek.
 * Using direct .ogg links with corrected MD5 hash paths (e.g., 0/03 for Theta).
 * Names (Alpha, Beta, etc.) are internal IDs only and not shown to the user.
 */
export const GREEK_ALPHABET: GreekLetterExtended[] = [
  { 
    id: 'alpha', name: 'Alpha', upper: 'Α', lower: 'α', 
    soundDescription: 'Like a in Father', exampleWord: 'Father', ipa: '[a]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Open_front_unrounded_vowel.ogg', 
    pronunciationNote: 'A pure open "a" sound.' 
  },
  { 
    id: 'beta', name: 'Beta', upper: 'Β', lower: 'β', 
    soundDescription: 'Like v in Vine', exampleWord: 'Vet', ipa: '[v]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Voiced_labiodental_fricative.ogg', 
    pronunciationNote: 'In Modern Greek, this is always a "v" sound.' 
  },
  { 
    id: 'gamma', name: 'Gamma', upper: 'Γ', lower: 'γ', 
    soundDescription: 'Like y in Yes', exampleWord: 'Year', ipa: '[ɣ] / [ʝ]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Voiced_velar_fricative.ogg', 
    pronunciationNote: 'Soft "y" before e/i, otherwise a guttural "gh".' 
  },
  { 
    id: 'delta', name: 'Delta', upper: 'Δ', lower: 'δ', 
    soundDescription: 'Like th in This', exampleWord: 'The', ipa: '[ð]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Voiced_dental_fricative.ogg', 
    pronunciationNote: 'Voiced "th" as in "the".' 
  },
  { 
    id: 'epsilon', name: 'Epsilon', upper: 'Ε', lower: 'ε', 
    soundDescription: 'Like e in Pet', exampleWord: 'Bet', ipa: '[e̞]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Mid-front_unrounded_vowel.ogg', 
    pronunciationNote: 'A short, crisp "e" sound.' 
  },
  { 
    id: 'zeta', name: 'Zeta', upper: 'Ζ', lower: 'ζ', 
    soundDescription: 'Like z in Zoo', exampleWord: 'Zoo', ipa: '[z]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Voiced_alveolar_sibilant.ogg', 
    pronunciationNote: 'Standard voiced "z" sound.' 
  },
  { 
    id: 'eta', name: 'Eta', upper: 'Η', lower: 'η', 
    soundDescription: 'Like ee in Meet', exampleWord: 'Police', ipa: '[i]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Close_front_unrounded_vowel.ogg', 
    pronunciationNote: 'In Modern Greek, this is a pure "ee" sound.' 
  },
  { 
    id: 'theta', name: 'Theta', upper: 'Θ', lower: 'θ', 
    soundDescription: 'Like th in Think', exampleWord: 'Thought', ipa: '[θ]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Voiceless_dental_fricative.ogg', 
    pronunciationNote: 'Voiceless "th" as in "think".' 
  },
  { 
    id: 'iota', name: 'Iota', upper: 'Ι', lower: 'ι', 
    soundDescription: 'Like ee in Meet', exampleWord: 'Igloo', ipa: '[i]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Close_front_unrounded_vowel.ogg', 
    pronunciationNote: 'Standard [i] sound.' 
  },
  { 
    id: 'kappa', name: 'Kappa', upper: 'Κ', lower: 'κ', 
    soundDescription: 'Like k in Skill', exampleWord: 'Scar', ipa: '[k]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Voiceless_velar_plosive.ogg', 
    pronunciationNote: 'Unaspirated "k", as in "skill".' 
  },
  { 
    id: 'lambda', name: 'Lambda', upper: 'Λ', lower: 'λ', 
    soundDescription: 'Like l in Look', exampleWord: 'Lamp', ipa: '[l]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Alveolar_lateral_approximant.ogg', 
    pronunciationNote: 'Standard "l" sound.' 
  },
  { 
    id: 'mu', name: 'Mu', upper: 'Μ', lower: 'μ', 
    soundDescription: 'Like m in Moon', exampleWord: 'Moon', ipa: '[m]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Bilabial_nasal.ogg', 
    pronunciationNote: 'Standard "m" sound.' 
  },
  { 
    id: 'nu', name: 'Nu', upper: 'Ν', lower: 'ν', 
    soundDescription: 'Like n in Net', exampleWord: 'Net', ipa: '[n]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Alveolar_nasal.ogg', 
    pronunciationNote: 'Standard "n" sound.' 
  },
  { 
    id: 'xi', name: 'Xi', upper: 'Ξ', lower: 'ξ', 
    soundDescription: 'Like x in Dixon', exampleWord: 'Taxi', ipa: '[ks]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Ks_%28phoneme%29.ogg', 
    pronunciationNote: 'The cluster "ks", as in "taxi".' 
  },
  { 
    id: 'omicron', name: 'Omicron', upper: 'Ο', lower: 'ο', 
    soundDescription: 'Like o in Off', exampleWord: 'Chore', ipa: '[o̞]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Mid-back_rounded_vowel.ogg', 
    pronunciationNote: 'A pure "o" sound.' 
  },
  { 
    id: 'pi', name: 'Pi', upper: 'Π', lower: 'π', 
    soundDescription: 'Like p in Spy', exampleWord: 'Paper', ipa: '[p]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Voiceless_bilabial_plosive.ogg', 
    pronunciationNote: 'Unaspirated "p", as in "spy".' 
  },
  { 
    id: 'rho', name: 'Rho', upper: 'Ρ', lower: 'ρ', 
    soundDescription: 'Like r in Autumn', exampleWord: 'Road', ipa: '[ɾ]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Alveolar_tap.ogg', 
    pronunciationNote: 'An alveolar tap, like the "tt" in American "autumn".' 
  },
  { 
    id: 'sigma', name: 'Sigma', upper: 'Σ', lower: 'σ', 
    soundDescription: 'Like s in Sip', exampleWord: 'Sun', ipa: '[s]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Voiceless_alveolar_sibilant.ogg', 
    pronunciationNote: 'Standard "s" sound.' 
  },
  { 
    id: 'tau', name: 'Tau', upper: 'Τ', lower: 'τ', 
    soundDescription: 'Like t in Stay', exampleWord: 'Stay', ipa: '[t]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Voiceless_alveolar_plosive.ogg', 
    pronunciationNote: 'Unaspirated "t", as in "stay".' 
  },
  { 
    id: 'upsilon', name: 'Upsilon', upper: 'Υ', lower: 'υ', 
    soundDescription: 'Like ee in Meet', exampleWord: 'System', ipa: '[i]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Close_front_unrounded_vowel.ogg', 
    pronunciationNote: 'Modern Greek Upsilon is identical to Iota.' 
  },
  { 
    id: 'phi', name: 'Phi', upper: 'Φ', lower: 'φ', 
    soundDescription: 'Like f in Four', exampleWord: 'Phone', ipa: '[f]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Voiceless_labiodental_fricative.ogg', 
    pronunciationNote: 'Standard "f" sound.' 
  },
  { 
    id: 'chi', name: 'Chi', upper: 'Χ', lower: 'χ', 
    soundDescription: 'Like ch in Loch', exampleWord: 'Chaos', ipa: '[x]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Voiceless_velar_fricative.ogg', 
    pronunciationNote: 'A raspy "ch" as in "Loch".' 
  },
  { 
    id: 'psi', name: 'Psi', upper: 'Ψ', lower: 'ψ', 
    soundDescription: 'Like ps in Lips', exampleWord: 'Popsicle', ipa: '[ps]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Ps_%28phoneme%29.ogg', 
    pronunciationNote: 'The cluster "ps", as in "lips".' 
  },
  { 
    id: 'omega', name: 'Omega', upper: 'Ω', lower: 'ω', 
    soundDescription: 'Like o in Bone', exampleWord: 'Ocean', ipa: '[o̞]', 
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Mid-back_rounded_vowel.ogg', 
    pronunciationNote: 'Pure "o" sound. Identical to Omicron.' 
  },
];

export const LEVELS: LevelGroup[] = [
  {
    id: 'l1',
    title: 'Level 1: Sound-Alikes',
    description: 'Letters that look and sound like Latin counterparts.',
    letters: ['alpha', 'epsilon', 'iota', 'kappa', 'mu', 'omicron', 'tau']
  },
  {
    id: 'l2',
    title: 'Level 2: Visual Traps',
    description: 'Familiar shapes but different sounds.',
    letters: ['beta', 'eta', 'nu', 'rho', 'chi']
  },
  {
    id: 'l3',
    title: 'Level 3: Classic Symbols',
    description: 'Commonly recognized geometric Greek shapes.',
    letters: ['gamma', 'delta', 'theta']
  },
  {
    id: 'l4',
    title: 'Level 4: Scientific Icons',
    description: 'Standard symbols from math and physics.',
    letters: ['lambda', 'pi', 'sigma']
  },
  {
    id: 'l5',
    title: 'Level 5: Famous Finales',
    description: 'The most iconic and distinctive characters.',
    letters: ['phi', 'omega']
  },
  {
    id: 'l6',
    title: 'Level 6: The Complex Ones',
    description: 'Master the remaining unique characters.',
    letters: ['zeta', 'xi', 'upsilon', 'psi']
  }
];

export const APP_COLORS = {
  bg: 'bg-white',
  textMain: 'text-[#002B5B]',
  textAccent: 'text-[#005BAE]',
  button: 'bg-[#0096C7]',
  buttonActive: 'active:bg-[#0077B6]',
  buttonText: 'text-white',
  navIcon: 'text-[#0096C7]',
  backArrow: 'text-[#002B5B]'
};
