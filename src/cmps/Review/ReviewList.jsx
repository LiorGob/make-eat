import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getRecipe } from '../../store/actions/recipeActions';
import { ReviewPreview } from './ReviewPreview';
class _ReviewList extends Component {
    state = {

    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getRecipe(this.props.match.params.id);
    }

    render() {
        const { recipe } = this.props;
        return (
            <div className="main-container">
                <section>
                    <h1>All reviews for {recipe.name}</h1>
                    <div className="review-list">
                        {recipe && recipe.reviews.map((review, ind) => {
                            return <ReviewPreview key={review._id + '_' + ind} review={review} />
                        })}
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recipe: state.recipeReducer.recipe
    }
}

const mapDispatchToProps = {
    getRecipe
}

export const ReviewList = connect(mapStateToProps, mapDispatchToProps)(_ReviewList)
