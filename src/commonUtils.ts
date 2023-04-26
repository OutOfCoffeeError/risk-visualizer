export function formatRiskFactors(jsonStr: string): string {
    let json = JSON.parse(jsonStr);
    let table = '';
    for (const [key, value] of Object.entries(json)) {
        table += `${key} = ${value}\n`;
    }
    return table;
}