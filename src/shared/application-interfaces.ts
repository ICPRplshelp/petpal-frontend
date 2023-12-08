/*

    APPLICATION_STATUS = [
        ("all", "All"),
        ("accepted", "Accept"),
        ("denied", "Decline"),
        ("pending", "Pending"),
        ("withdrawn", "Withdraw")
    ]

    # the three parameters that can be passed in
    reason = models.TextField()
    user = models.ForeignKey(PetPalUser, related_name='application_user', on_delete=models.SET_NULL, null=True)
    pet = models.ForeignKey(Pet, related_name='application_pet', on_delete=models.CASCADE)

    # always set to pending
    application_status = models.CharField(max_length=200, choices=APPLICATION_STATUS, default='pending')

    created_time = models.DateTimeField(auto_now_add=True)
    last_update_time = models.DateTimeField(auto_now_add=True)


 */


export interface ApplicationSubmit {
    reason: string;
    pet: number;
}

export interface Application extends ApplicationSubmit {
    id: number;
    user: number;
    pet: number;
    application_status: "accepted" | "denied" | "pending" | "withdrawn" | "";
    created_time: Date;
    last_update_time: Date;
    applicant_name: string;
    pet_name: string;
}
