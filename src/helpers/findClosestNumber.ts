export default function findClosestNumber(arr: number[], target: number) {
    // Проверка, что массив не пустой
    if (arr.length === 0) return null;

    // Инициализируем ближайшее число и минимальную разницу
    let closest = arr[0];
    let minDifference = Math.abs(target - arr[0]);

    // Проходим по всем числам в массиве
    for (let i = 1; i < arr.length; i++) {
        let difference = Math.abs(target - arr[i]);

        // Если текущая разница меньше минимальной, обновляем ближайшее число
        if (difference < minDifference) {
            minDifference = difference;
            closest = arr[i];
        }
    }

    return closest;
}
