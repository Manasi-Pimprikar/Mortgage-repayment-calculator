class MortgageRepayments {
    repaymentRadioBtn = document.getElementById('repayment');
    interestOnlyRadioBtn = document.getElementById('interest-only');

    constructor() {
        this.mortgageAmountELement = document.getElementById('mortgage-amount');
        this.mortgageTermElement = document.getElementById('mortgage-term');
        this.mortgageInterestElement = document.getElementById('interest-rate');
    }

    formValidation() {
        document.querySelectorAll('.form-control').forEach((x) => {
            const errorElement = document.getElementById(x.id + '-error');
            if(x.value === '') {
                errorElement.style.display = "block";
            }
            else {
                errorElement.style.display = "none";
                document.querySelectorAll('.empty-content').forEach((x) => {
                    x.style.display = "none";
                })
                document.querySelector('.completed-div').style.display = "block";
            }
        });

        if(this.repaymentRadioBtn.checked === true) {
            document.getElementById('radio-error').style.display = "none";
        }else if(this.interestOnlyRadioBtn.checked === true) {
            document.getElementById('radio-error').style.display = "none";
        }
        else {
            document.getElementById('radio-error').style.display = "block";
        }
    }

    mortgageCalculation(mortgageAmount, mortgageTermYears, annualInterestRate, mortgageType) {
        let monthlyInterestRate = annualInterestRate / 100 / 12;
        let totalYears = mortgageTermYears * 12;

        if(mortgageType === 'repayment') {
            let monthlyPayment = mortgageAmount * (monthlyInterestRate * Math.pow((1 + monthlyInterestRate), totalYears)) / (Math.pow((1 + monthlyInterestRate), totalYears) - 1);

            let totalPayment = monthlyPayment * totalYears;

            console.log('repayment===',monthlyPayment.toFixed(2), totalPayment.toFixed(2))

            document.querySelector('.monthly-amount').innerHTML = monthlyPayment.toFixed(2);
            document.querySelector('.total-amount').innerHTML = totalPayment.toFixed(2);
        }
        else if(mortgageType === 'interest-only') {
            let monthlyPayment = mortgageAmount * monthlyInterestRate;
            let totalPayment = monthlyPayment * totalYears;

            console.log('interest only==',monthlyPayment.toFixed(2), totalPayment.toFixed(2))

            document.querySelector('.monthly-amount').innerHTML = monthlyPayment.toFixed(2);
            document.querySelector('.total-amount').innerHTML = totalPayment.toFixed(2);
        }
    }

    clearForm() {
        document.getElementById('mortgage-form').reset();
        document.querySelectorAll('.empty-content').forEach((x) => {
            x.style.display = "block";
        })
        document.querySelector('.completed-div').style.display = "none";
    }
}

let mortgageCalculator = new MortgageRepayments();

document.querySelector('#mortgage-form').addEventListener('submit', (event) => {
    event.preventDefault();
    mortgageCalculator.formValidation();

    document.querySelectorAll('.radio-btn').forEach((x) => {
        if(x.checked === true) {
            mortgageCalculator.mortgageCalculation(document.getElementById('mortgage-amount').value, document.getElementById('mortgage-term').value, document.getElementById('interest-rate').value, x.value);
        }
    });


});

document.getElementById('clearInput').addEventListener('click', () => {
    mortgageCalculator.clearForm();
})