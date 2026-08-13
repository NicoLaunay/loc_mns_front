import { EquipmentStatus } from "../enums/equipment-status.enum";
import { EquipmentBuilder, EquipmentWithLoans } from "./equipment";
import { Loan } from "./loan";


/**
 * Attribue un statut à tous les équipements d'une liste
 * @param equipments 
 * @returns 
 */
export function mapStatus(equipments: EquipmentWithLoans[]): EquipmentWithLoans[] {
    return equipments.map(equipment => {
        const lastLoan = equipment.loans[0]
        if (lastLoan && !lastLoan.returnDate) {
            equipment.status = EquipmentStatus.BORROWED
        } else {
            equipment.status = EquipmentStatus.AVAILABLE
        }

        // TODO: gérer les cas de matériel non-fonctionnel

        return equipment
    }

    )
}