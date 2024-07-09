<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'url'
        ]);

        $project = Project::create($validated);

        if (!empty($validated['images'])) {
            foreach ($validated['images'] as $image_url) {
                $project->images()->create(['image_url' => $image_url]);
            }
        }

        return response()->json($project, 201);
    }
}
