import { GreekLetter, LevelGroup } from './types';

/**
 * App-wide color palette for consistent branding.
 */
export const APP_COLORS = {
  bg: 'bg-white',
  textMain: 'text-[#002B5B]',
  textAccent: 'text-[#0096C7]',
  button: 'bg-[#007ACC]',
};

/**
 * Clean base URL for raw GitHub content.
 */
const AUDIO_BASE = 'https://raw.githubusercontent.com/fioli-official/lettersgr-proto-v0/main/audio/';

/**
 * Verified IPA Phoneme Audio Sources for Modern Greek.
 */
export const GREEK_ALPHABET: GreekLetter[] = [
  { 
    id: 'alpha', name: 'Alpha', upper: 'Α', lower: 'α', 
    sounds: [{
      ipa: '[a]', description: 'Like A in Father', example: 'Father',
      audioUrl: `${AUDIO_BASE}Open_front_unrounded_vowel.mp3`
    }]
  },
  { 
    id: 'beta', name: 'Beta', upper: 'Β', lower: 'β', 
    sounds: [{
      ipa: '[v]', description: 'Like V in Vine', example: 'Vet',
      audioUrl: `${AUDIO_BASE}Voiced_labiodental_fricative.mp3`
    }],
    pronunciationNote: 'In Modern Greek, this is always a "v" sound.' 
  },
  { 
    id: 'gamma', name: 'Gamma', upper: 'Γ', lower: 'γ', 
    sounds: [
      {
        ipa: '[ɣ]', label: 'before BACK vowels: α, ο, ω, ου', 
        description: 'Soft G', 
        example: 'Spanish "agua"',
        audioUrl: `${AUDIO_BASE}Voiced_velar_fricative.mp3`
      },
      {
        ipa: '[ʝ]', label: 'before FRONT vowels: ε, αι, η, ι, υ, ει, οι, υι', 
        description: 'Like Y in Yes', 
        example: 'Year',
        audioUrl: `${AUDIO_BASE}Voiced_palatal_fricative.mp3`
      }
    ],
    pronunciationNote: 'Sound varies based on the following vowel.' 
  },
  { 
    id: 'delta', name: 'Delta', upper: 'Δ', lower: 'δ', 
    sounds: [{
      ipa: '[ð]', description: 'Like TH in This', example: 'The',
      audioUrl: `${AUDIO_BASE}Voiced_dental_fricative.mp3`
    }]
  },
  { 
    id: 'epsilon', name: 'Epsilon', upper: 'Ε', lower: 'ε', 
    sounds: [{
      ipa: '[e]', description: 'Like E in Pet', example: 'Bet',
      audioUrl: `${AUDIO_BASE}Close-mid_front_unrounded_vowel.mp3`
    }]
  },
  { 
    id: 'zeta', name: 'Zeta', upper: 'Ζ', lower: 'ζ', 
    sounds: [{
      ipa: '[z]', description: 'Like Z in Zoo', example: 'Zoo',
      audioUrl: `${AUDIO_BASE}Voiced_alveolar_sibilant.mp3`
    }]
  },
  { 
    id: 'eta', name: 'Eta', upper: 'Η', lower: 'η', 
    sounds: [{
      ipa: '[i]', description: 'Like EE in Meet', example: 'Police',
      audioUrl: `${AUDIO_BASE}Close_front_unrounded_vowel.mp3`
    }],
    pronunciationNote: 'Modern Greek "Eta" is identical to "Iota" and "Upsilon".'
  },
  { 
    id: 'theta', name: 'Theta', upper: 'Θ', lower: 'θ', 
    sounds: [{
      ipa: '[θ]', description: 'Like TH in Think', example: 'Thought',
      audioUrl: `${AUDIO_BASE}Voiceless_dental_fricative.mp3`
    }]
  },
  { 
    id: 'iota', name: 'Iota', upper: 'Ι', lower: 'ι', 
    sounds: [{
      ipa: '[i]', description: 'Like EE in Meet', example: 'Igloo',
      audioUrl: `${AUDIO_BASE}Close_front_unrounded_vowel.mp3`
    }]
  },
  { 
    id: 'kappa', name: 'Kappa', upper: 'Κ', lower: 'κ', 
    sounds: [{
      ipa: '[k]', description: 'Like K in Skill', example: 'Scar',
      audioUrl: `${AUDIO_BASE}Voiceless_velar_plosive.mp3`
    }],
    pronunciationNote: 'Unaspirated "k", like the "k" in "skill" rather than "kill".'
  },
  { 
    id: 'lambda', name: 'Lambda', upper: 'Λ', lower: 'λ', 
    sounds: [{
      ipa: '[l]', description: 'Like L in Look', example: 'Lamp',
      audioUrl: `${AUDIO_BASE}Alveolar_lateral_approximant.mp3`
    }]
  },
  { 
    id: 'mu', name: 'Mu', upper: 'Μ', lower: 'μ', 
    sounds: [{
      ipa: '[m]', description: 'Like M in Moon', example: 'Moon',
      audioUrl: `${AUDIO_BASE}Bilabial_nasal.mp3`
    }]
  },
  { 
    id: 'nu', name: 'Nu', upper: 'Ν', lower: 'ν', 
    sounds: [{
      ipa: '[n]', description: 'Like N in Net', example: 'Net',
      audioUrl: `${AUDIO_BASE}Alveolar_nasal.mp3`
    }]
  },
  { 
    id: 'xi', name: 'Xi', upper: 'Ξ', lower: 'ξ', 
    sounds: [{
      ipa: '[ks]', description: 'Like X in Taxi', example: 'Taxi',
      audioUrl: `${AUDIO_BASE}Xi.mp3`
    }]
  },
  { 
    id: 'omicron', name: 'Omicron', upper: 'Ο', lower: 'ο', 
    sounds: [{
      ipa: '[o]', description: 'Like O in Port', example: 'Force',
      audioUrl: `${AUDIO_BASE}Close-mid_back_rounded_vowel.mp3`
    }]
  },
  { 
    id: 'pi', name: 'Pi', upper: 'Π', lower: 'π', 
    sounds: [{
      ipa: '[p]', description: 'Like P in Spy', example: 'Spy',
      audioUrl: `${AUDIO_BASE}Voiceless_bilabial_plosive.mp3`
    }],
    pronunciationNote: 'Unaspirated "p", like the "p" in "spy" rather than "pie".'
  },
  { 
    id: 'rho', name: 'Rho', upper: 'Ρ', lower: 'ρ', 
    sounds: [{
      ipa: '[ɾ]', description: 'Like R in Spanish "pero"', example: 'Better',
      audioUrl: `${AUDIO_BASE}Alveolar_tap.mp3`
    }],
    pronunciationNote: 'A quick "tap" of the tongue, similar to the American "tt" in "better" or the Spanish single "r".'
  },
  { 
    id: 'sigma', name: 'Sigma', upper: 'Σ', lower: 'σ', 
    sounds: [{
      ipa: '[s]', description: 'Like S in Sip', example: 'Sun',
      audioUrl: `${AUDIO_BASE}Voiceless_alveolar_sibilant.mp3`
    }]
  },
  { 
    id: 'final_sigma', name: 'Final Sigma', upper: 'Σ', lower: 'ς', 
    sounds: [{
      ipa: '[s]', description: 'Like S in Bus', example: 'Lips',
      audioUrl: `${AUDIO_BASE}Voiceless_alveolar_sibilant.mp3`
    }],
    pronunciationNote: 'Special form of Sigma used only at the end of words.'
  },
  { 
    id: 'tau', name: 'Tau', upper: 'Τ', lower: 'τ', 
    sounds: [{
      ipa: '[t]', description: 'Like T in Stay', example: 'Stay',
      audioUrl: `${AUDIO_BASE}Voiceless_alveolar_plosive.mp3`
    }],
    pronunciationNote: 'Unaspirated "t", like the "t" in "stay" rather than "tea".'
  },
  { 
    id: 'upsilon', name: 'Upsilon', upper: 'Υ', lower: 'υ', 
    sounds: [{
      ipa: '[i]', description: 'Like EE in Meet', example: 'System',
      audioUrl: `${AUDIO_BASE}Close_front_unrounded_vowel.mp3`
    }]
  },
  { 
    id: 'phi', name: 'Phi', upper: 'Φ', lower: 'φ', 
    sounds: [{
      ipa: '[f]', description: 'Like F in Four', example: 'Phone',
      audioUrl: `${AUDIO_BASE}Voiceless_labiodental_fricative.mp3`
    }]
  },
  { 
    id: 'chi', name: 'Chi', upper: 'Χ', lower: 'χ', 
    sounds: [
      {
        ipa: '[x]', label: 'before BACK vowels: α, ο, ω, ου', 
        description: 'Like CH in Loch', 
        example: 'Loch',
        audioUrl: `${AUDIO_BASE}Voiceless_velar_fricative.mp3`
      },
      {
        ipa: '[ç]', label: 'before FRONT vowels: ε, αι, η, ι, υ, ει, οι, υι', 
        description: 'Like H in Huge', 
        example: 'Huge',
        audioUrl: `${AUDIO_BASE}Voiceless_palatal_fricative.mp3`
      }
    ],
    pronunciationNote: 'Sound varies based on the following vowel.' 
  },
  { 
    id: 'psi', name: 'Psi', upper: 'Ψ', lower: 'ψ', 
    sounds: [{
      ipa: '[ps]', description: 'Like PS in Lips', example: 'Popsicle',
      audioUrl: `${AUDIO_BASE}Psi.mp3`
    }]
  },
  { 
    id: 'omega', name: 'Omega', upper: 'Ω', lower: 'ω', 
    sounds: [{
      ipa: '[o]', description: 'Like O in Port', example: 'Story',
      audioUrl: `${AUDIO_BASE}Close-mid_back_rounded_vowel.mp3`
    }],
    pronunciationNote: 'In Modern Greek, "Omega" is identical to "Omicron".'
  },
];

export const LEVELS: LevelGroup[] = [
  { id: 'l1', title: 'Level 1', description: 'Vowels & Basic Consonants', letters: ['alpha', 'beta', 'gamma', 'delta', 'epsilon'] },
  { id: 'l2', title: 'Level 2', description: 'Intermediate sounds', letters: ['zeta', 'eta', 'theta', 'iota', 'kappa'] },
  { id: 'l3', title: 'Level 3', description: 'Liquids & Nasals', letters: ['lambda', 'mu', 'nu', 'xi', 'omicron'] },
  { id: 'l4', title: 'Level 4', description: 'More consonants', letters: ['pi', 'rho', 'sigma', 'final_sigma', 'tau', 'upsilon'] },
  { id: 'l5', title: 'Level 5', description: 'Final characters', letters: ['phi', 'chi', 'psi', 'omega'] }
];