
// VERSION TYPE 1
// const content =  'Emotion    Percentage\n' +
// '------------------------------\n' +
// 'Joy           30%\n' +
// 'Surprise      15%\n' +
// 'Disgust       5%\n' +
// 'Sadness       20%\n' +
// 'Fear          10%\n' +
// 'Anger         20%';

// VERSION TYPE 2
// const content = 'Emotion    | Percentage\n' +
// '-----------|------------\n' +
// 'Joy        | 25%\n' +
// 'Surprise   | 12%\n' +
// 'Disgust    | 8%\n' +
// 'Sadness    | 15%\n' +
// 'Fear       | 13%\n' +
// 'Anger      | 27%';



function parse(content) {
    let index = 0;
    const table_rows = content.split('\n');
    for (let i=0; i < table_rows.length; i++) {
        if (i <= 1) {
            continue;
        }
        const table_row = table_rows[i];
        if (table_row.includes('|')) {
            const parts = table_row.split('|');
            const emotion = parts[0].trim();
            const percentage = parts[1].trim();
            console.log("emotion", emotion, "percentage", percentage)
        } else {
            const parts = table_row.split(/\s+/);
            const emotion = parts[0];
            const percentage = parts[1];
            console.log("emotion", emotion, "percentage", percentage)
        }
    }
}

// parse(content);

