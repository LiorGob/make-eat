import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveRecipe } from '../../store/actions/recipeActions';
import { recipeService } from '../../services/recipeService';

class _AddReview extends Component {

    state = {
        recipe: {
            reviews: [{ by: {}, txt: '', rating, }]
        }
    }

    componentDidMount = async () => {
        const recipeId = this.props.match.params.id
        if (recipeId) {
            const recipe = await recipeService.getById(recipeId)
            this.setState({ recipe })
        }
    }

    onHandleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        this.setState(prevState => {
            var newReviews = [...this.state.reviews]
            newReviews.push(value)
            return {
                recipe: {
                    ...prevState.recipe,
                    reviews: newReviews
                }
            }
        })
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}





const mapStateToProps = state => {
    return {
        recipes: state.recipeReducer.recipes,

    }
}


const mapDispatchToProps = {
    saveRecipe,
}

export const AddReview = connect(mapStateToProps, mapDispatchToProps)(_AddReview)






// onInputChange = (ev) => {
//     const value = ev.target.type === 'rating' ? +ev.target.value : ev.target.value
//     this.setState({ reviewToAdd: { ...this.state.reviewToAdd, [ev.target.name]: value } })
// }

// addReview = (ev) => {
//     ev.preventDefault();
//     this.props.onAddReview(this.state.reviewToAdd);
//     this.setState({reviewToAdd: bookService.getEmptyReview()})
// }

// render() {
//     return (
//         <div className="review-container">
//             <label>Add Review:</label>
//             <form className="from-review" onSubmit={ this.addReview }>
//                 <input className="full-name-review" name="fullName" value={ this.state.reviewToAdd.fullName }
//                     placeholder="Full Name" type="text"
//                     onChange={ this.onInputChange } />

//                 <input name="rating" value={ this.state.value }
//                     min="1" max="5"
//                     placeholder="Rate" type="range"
//                     onChange={ this.onInputChange } />
//                 <label>
//                     <input type="date" id="datepicker" name="datepicker"
//                         onChange={ this.onInputChange } />
//                 </label>

//                 <input className="free-text-review" name="txt" value={ this.state.txt }
//                     placeholder="Free text" type="text" value={ this.state.reviewToAdd.txt }
//                     onChange={ this.onInputChange } />
//                 <button className="btn-add-review">Add Review</button>
//             </form>
//         </div>
//     )
// }


// function addReview(recipeId, review) {
//     return getById(recipeId)
// 
//         .then(book => {
//             if (!book.reviews) book.reviews = [];
//             book.reviews.push(review);
//             storageService.saveToStorage(KEY_BOOKS, gBooks);
//         })
// }


