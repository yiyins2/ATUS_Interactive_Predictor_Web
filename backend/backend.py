from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import json 

from sklearn.model_selection import train_test_split
from sklearn.linear_model import Lasso
from sklearn.model_selection import cross_val_score

app = Flask(__name__)
cors = CORS(app)
 
df = pd.read_csv("ht_data.csv")

all_features = ["age", "gender", "race", "salary"]
all_labels = ["Personal Care Activities", "Work & Work-Related Activities", "Household Activities", "Socializing, Relaxing, and Leisure", "Eating and Drinking"] 

models = [{
        "features": all_features, 
        "labels": all_labels, 
        "feature_values": [10, 1, 1, 0]
    }, {
        "features": all_features, 
        "labels": all_labels,
        "feature_values": [10, 1, 1, 0]
    }, {
        "features": all_features, 
        "labels": all_labels,
        "feature_values": [10, 1, 1, 0]
}]

train_X, test_X, train_y, test_y = train_test_split(df[all_features], df[all_labels], test_size=0.3, random_state=765)

colors = ["#fe4a49", "#2ab74a", "#fed766"]
pred_len = len(all_labels)
cv_fold = 5
predictions = []
scores = []
cross_val_scores = []
for idx, m in enumerate(["A", "B", "C"]): 
    scores.append({
        "model": m, 
        "score": 0, 
        "fill": colors[idx]
    })
    for i in range(cv_fold):
        cross_val_scores.append({
            "model": m, 
            "x": idx + 0.5, 
            "cross_val_score": 0,
            "fill": colors[idx]
        })
for i in range(pred_len): 
    predictions.append({
        "category": all_labels[i], 
        "Model A": 0, 
        "Model B": 0, 
        "Model C": 0
    })

def train_test(model_idx): 
    model = models[model_idx]
    features = model["features"]
    labels = model["labels"]
    feature_values = model["feature_values"]
    reg = Lasso(alpha=0.1)
    reg.fit(train_X, train_y)
    scores[model_idx]["score"] = reg.score(test_X[features], test_y[labels])
    cv_scores = cross_val_score(reg, train_X[features], train_y[labels], cv=5)
    for i in range(cv_fold): 
        cross_val_scores[model_idx * cv_fold + i]["cross_val_score"] = cv_scores[i]
    pred = reg.predict(np.array([feature_values]))
    for i in range(pred_len): 
        if model_idx == 0: 
            model_id = "Model A"
        elif model_idx == 1:
            model_id = "Model B"
        else: 
            model_id = "Model C" 
        predictions[i][model_id] = pred[0][i]

@app.route('/predictions', methods=['GET'])
def predictions_route(): 
    return jsonify(predictions)

@app.route('/scores', methods=['GET'])
def scores_route(): 
    return jsonify(scores)

@app.route('/cross_val_scores', methods=['GET'])
def cross_val_scores_route(): 
    return jsonify(cross_val_scores)

@app.route('/model_input_put', methods=['GET', 'PUT'])
def model_input_put_route(): 
    data = json.loads(request.data)
    model_id = data["model"]
    input = data["input"]
    if model_id == "A": 
        model_idx = 0
    elif model_id == "B": 
        model_idx = 1
    else: 
        model_idx = 2
    models[model_idx]["feature_values"] = input
    train_test(model_idx)
    return jsonify([predictions, scores, cross_val_scores])

@app.route('/reinit', methods=['GET', 'PUT'])
def reinit_route(): 
    global predictions, scores, cross_val_scores
    predictions = []
    scores = []
    cross_val_scores = []
    for idx, m in enumerate(["A", "B", "C"]): 
        scores.append({
            "model": m, 
            "score": 0, 
            "fill": colors[idx]
        })
        for i in range(cv_fold):
            cross_val_scores.append({
                "model": m, 
                "x": idx + 0.5, 
                "cross_val_score": 0,
                "fill": colors[idx]
            })
    for i in range(pred_len): 
        predictions.append({
            "category": all_labels[i], 
            "Model A": 0, 
            "Model B": 0, 
            "Model C": 0
        })
    return 

if __name__ == "__main__":
    app.run(debug=True)