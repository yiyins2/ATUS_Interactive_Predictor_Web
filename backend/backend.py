from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np


from sklearn.model_selection import train_test_split
from sklearn.linear_model import Lasso
from sklearn.model_selection import cross_val_score

app = Flask(__name__)
CORS(app)

df = pd.read_csv("ht_data.csv")

all_features = ["year", "age", "gender", "race", "salary", "metro"]
all_labels = ["Personal Care Activities", "Work & Work-Related Activities", "Household Activities"] 

models = [{
        "features": ["year", "age", "gender", "race", "salary", "metro"], 
        "labels": ["Personal Care Activities", "Work & Work-Related Activities", "Household Activities"], 
        "feature_values": [[2020, 30, 1, 1, 100000, -1]]
    }, {
        "features": ["year", "age", "gender", "race", "salary", "metro"], 
        "labels": ["Personal Care Activities", "Work & Work-Related Activities", "Household Activities"],
        "feature_values": [[2020, 30, 1, 1, 100000, -1]]
    }, {
        "features": ["year", "age", "gender", "race", "salary", "metro"], 
        "labels": ["Personal Care Activities", "Work & Work-Related Activities", "Household Activities"],
        "feature_values": [[2020, 30, 1, 1, 100000, -1]]
}]

train_X, test_X, train_y, test_y = train_test_split(df[all_features], df[all_labels], test_size=0.3, random_state=765)

pred_len = 5
cv_fold = 5
predictions = []
scores = []
cross_val_scores = []
for idx, m in enumerate(["A", "B", "C"]): 
    scores.append({
        "model": m, 
        "score": 3
    })
    for i in range(pred_len): 
        predictions.append({
            "model": m, 
            "x": idx + 0.5, 
            "prediction": i
        })
    for i in range(cv_fold):
        cross_val_scores.append({
            "model": m, 
            "x": idx + 0.5, 
            "cross_val_score": i
        })

def train_test(model_id): 
    model = models[model_id]
    features = model["features"]
    labels = model["labels"]
    feature_values =  model["feature_values"]
    reg = Lasso(alpha=0.1)
    reg.fit(train_X, train_y)
    scores[model_id]["score"] = reg.score(test_X[features], test_y[labels])
    cv_scores = cross_val_score(reg, train_X[features], train_y[labels], cv=5)
    for i in range(cv_fold): 
        cross_val_scores[model_id * cv_fold + i]["cross_val_score"] = cv_scores[i]
    pred = reg.predict(np.array(feature_values))
    for i in range(pred_len): 
        predictions[model_id * pred_len + i]["prediction"] = pred[i]

@app.route('/predictions')
def predictions_route(methods=['GET']): 
    return jsonify(predictions)

@app.route('/scores')
def scores_route(methods=['GET']): 
    return jsonify(scores)

@app.route('/cross_val_scores')
def cross_val_scores_route(methods=['GET']): 
    return jsonify(cross_val_scores)

if __name__ == "__main__":
    app.run(debug=True)