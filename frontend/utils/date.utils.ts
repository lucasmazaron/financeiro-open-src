import moment from "moment";

export class DateUtils {
  static getMonth(date: Date): number {
    if (!date) {
      throw new Error("DateUtils.getMonth: date is required");
    }

    return parseInt(moment(date).format("MM"));
  }

  static getYear(date: Date): number {
    if (!date) {
      throw new Error("DateUtils.getYear: date is required");
    }

    return moment(date).year();
  }

  static formatDate(date: Date | null): string {
    if (!date) {
      return "";
    }

    return moment(date).format("DD/MM/YYYY HH:mm");
  }

  static formatUTCDate(date: string): string {
    if (!date) {
      return "";
    }

    return moment.utc(date).format("DD/MM/YYYY HH:mm");
  }

  static formatDateWithoutTime(date: Date | null): string {
    if (!date) {
      return "";
    }

    return moment(date).format("DD/MM/YYYY");
  }

  static formatDateToBackend(date: Date | null): string {
    if (!date) {
      return "";
    }

    return moment(new Date(date)).format("YYYY-MM-DD");
  }
}
