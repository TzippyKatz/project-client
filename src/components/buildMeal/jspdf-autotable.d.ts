import jsPDF from "jspdf";

declare module "jspdf" {
  interface jsPDF {
    autoTable: any; // or more specific types if you need
  }
}