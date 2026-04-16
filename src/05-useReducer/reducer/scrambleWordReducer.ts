import { de } from "zod/locales";


export interface ScrambleWordState {
    words: string[];
    currentWord: string;
    scrambledWord: string;
    guess: string;
    points: number;
    errorCounter: number;
    maxAllowErrors: number;
    maxSkips: number;
    skipCounter: number;
    isGameOver: boolean;
    totalWords?: number;
}

const GAME_WORDS = [
    'REACT',
    'JAVASCRIPT',
    'TYPESCRIPT',
    'HTML',
    'ANGULAR',
    'SOLID',
    'NODE',
    'VUEJS',
    'SVELTE',
    'EXPRESS',
    'MONGODB',
    'POSTGRES',
    'DOCKER',
    'KUBERNETES',
    'WEBPACK',
    'VITE',
    'TAILWIND',
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = '') => {
    return word
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
};

export const getInitialState = (): ScrambleWordState => {

    const shuffleWords = shuffleArray([...GAME_WORDS]);

    return {
        currentWord: shuffleWords[0],
        errorCounter: 0,
        guess: '',
        isGameOver: false,
        maxAllowErrors: 3,
        maxSkips: 3,
        points: 0,
        scrambledWord: scrambleWord(shuffleWords[0]),
        skipCounter: 0,
        words: shuffleWords,
        totalWords: shuffleWords.length,
    };
};


export type ScrambleWordAction =
    | { type: 'SET_GUESS'; payload: string }
    | { type: 'CHECK_GUESS' }
    | { type: 'SKIP_WORD' }
    | { type: 'RESET_GAME', payload: ScrambleWordState };

export const scrambleWordReducer = (
    state: ScrambleWordState,
    action: ScrambleWordAction): ScrambleWordState => {

    switch (action.type) {
        case 'SET_GUESS':
            return {
                ...state,
                guess: action.payload.trim().toUpperCase(),
            };

        case 'CHECK_GUESS':
            if (state.guess === state.currentWord) {
                const newWords = state.words.slice(1);
                return {
                    ...state,
                    words: newWords,
                    currentWord: newWords[0],
                    scrambledWord: scrambleWord(newWords[0]),
                    guess: '',
                    points: state.points + 1,
                };
            }

            return {
                ...state,
                errorCounter: state.errorCounter + 1,
                isGameOver: (state.errorCounter + 1) >= state.maxAllowErrors,
                guess: '',
            };
                
        case 'SKIP_WORD': {
            if (state.skipCounter >= state.maxSkips) {
                return state; // No hacer nada si ya se alcanzó el límite de skips
            }

            const updatedWords = state.words.slice(1);

            return {
                ...state,
                words: updatedWords,
                currentWord: updatedWords[0],
                scrambledWord: scrambleWord(updatedWords[0]),
                guess: '',
                skipCounter: state.skipCounter + 1,
            };
        }

        case 'RESET_GAME': 
            return action.payload;

        default:
            return state;
    }

}