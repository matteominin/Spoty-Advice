export const moods = [
    {
        name: "happy",
        parameters: {
            valence: 0.7,  // Positive mood
            danceability: 0.7,  // Upbeat and danceable
            energy: 0.7,  // Energetic
            max_tempo: 180,  // Maximum tempo
            min_tempo: 100,  // Minimum tempo
        }
    },
    {
        name: "sad",
        parameters: {
            valence: 0.3,  // Melancholic mood
            energy: 0.3,  // Low energy
            max_tempo: 100,  // Maximum tempo
        }
    },
    {
        name: "energetic",
        parameters: {
            energy: 0.7,  // High energy
            danceability: 0.7,  // Very danceable
            min_tempo: 120,
            max_tempo: 180,  // Maximum tempo
        }
    },
    {
        name: "calm",
        parameters: {
            valence: 0.5,  // Neutral to slightly positive mood
            energy: 0.4,  // Moderate energy
            max_tempo: 100,  // Maximum tempo
        }
    },
    {
        name: "romantic",
        parameters: {
            valence: 0.7,  // Romantic mood
            energy: 0.5,  // Moderate energy
            max_tempo: 120,  // Maximum tempo
        }
    }
];
