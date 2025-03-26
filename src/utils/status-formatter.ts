export default class StatusFormatter {

    private static statusReplacement: { [key: number]: string } = {
        0: '0️⃣',
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣',
        6: '6️⃣',
        7: '7️⃣',
        8: '8️⃣',
        9: '9️⃣',
    };

    public static formatStatus(status: string): string {
        const statusString = status.toString();

        const formattedStatus = statusString.split('')
            .map(digit => this.statusReplacement[parseInt(digit)])
            .join(' ');

        return formattedStatus;
    }
}
